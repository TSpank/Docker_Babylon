function reset(_skeleton)
{
    // LEFT Shoulder
    _skeleton.bones[9].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,0.5,-0.5,0.5);
    _skeleton.bones[10].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
    _skeleton.bones[11].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    _skeleton.bones[12].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    // RIGHT Shoulder
    _skeleton.bones[33].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.5,-0.5,0.5,0.5);
    _skeleton.bones[34].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.707,0.0,0.0,0.707);
    _skeleton.bones[35].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);
    _skeleton.bones[36].getTransformNode().rotationQuaternion = new BABYLON.Quaternion(0.0,0.0,0.0,1.0);

    //Neck
    _skeleton.bones[4].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
    //Head
    _skeleton.bones[5].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

    // Upper Back
    _skeleton.bones[1].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
    _skeleton.bones[2].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
    // Lower Back
    _skeleton.bones[3].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);

    _skeleton.bones[0].getTransformNode().rotation = new BABYLON.Vector3(0.0,0.0,0.0);
}

function resetAvatar(_skeleton)
{
    _skeleton.returnToRest();
}

const jointSmoothing = {
    alpha: 0.3, // global smoothing factor — tune per joint if needed
    prev: {}    // stores previous constrained quaternion per joint name
};

function smoothJoint(name, currentConstrained, alpha = jointSmoothing.alpha) {
    if (!jointSmoothing.prev[name]) {
        jointSmoothing.prev[name] = currentConstrained.clone();
        return currentConstrained;
    }
    const smoothed = BABYLON.Quaternion.Slerp(
        jointSmoothing.prev[name],
        currentConstrained,
        alpha
    );
    jointSmoothing.prev[name] = smoothed.clone();
    return smoothed;
}

function parse_data_quats_and_angles(skeleton, quaternionData)
{
    console.log("datastreaming with quaternions and angles...");

    function computeLocalQuat(parentGlobal, childGlobal) {
        let parentInv = parentGlobal.clone().invert();
        return parentInv.multiply(childGlobal);
    }

    function computeGlobalQuat(parentGlobal, childLocal) {
        return parentGlobal.multiply(childLocal);
    }


    function convertQuat(q) {
        // Convert JSON quat to Babylon quaternion
        let babylonQuat = new BABYLON.Quaternion(
            parseFloat(q.x) || 0,
            parseFloat(q.y) || 0,
            parseFloat(q.z) || 0,
            parseFloat(q.w) || 1
        );
        return babylonQuat;
    }
   
    const OFFSETS = {
        l_upper: new BABYLON.Quaternion(0.707,0.0,0.0,0.707),
        l_lower: new BABYLON.Quaternion(0.0,0.0,0.0,1.0),

        r_upper: new BABYLON.Quaternion(0.707,0.0,0.0,0.707),
        r_lower: new BABYLON.Quaternion(0.0,0.0,0.0,1.0),

        l_shoulder: new BABYLON.Quaternion(0.5,0.5,-0.5,0.5),
        r_shoulder: new BABYLON.Quaternion(0.5,-0.5,0.5,0.5),
    };

  // swing twist decomposition and clamping functions for joint limits
    function swingTwistDecompose(q, twistAxis) {
        const axis = twistAxis.normalizeToNew();
        const v = new BABYLON.Vector3(q.x, q.y, q.z);
        const proj = axis.scale(BABYLON.Vector3.Dot(v, axis));
        let twist = new BABYLON.Quaternion(proj.x, proj.y, proj.z, q.w);

        if (twist.length() < 1e-6) {
            twist = BABYLON.Quaternion.Identity();
        } else {
            twist.normalize();
            if (twist.w < 0) twist.scaleInPlace(-1);
        }

        const swing = q.multiply(BABYLON.Quaternion.Inverse(twist));
        //const swing = BABYLON.Quaternion.Inverse(twist).multiply(q);
        swing.normalize();
        return { swing, twist };

    }

    function clampQuatAngle(q, maxAngleRad) {
        // FIX: canonicalize to the positive-w hemisphere before measuring the angle.
        // q and -q represent the same rotation; without this, a quaternion slightly past
        // w=0 would appear to have a ~360° angle instead of the correct ~0° angle.
        const sign = q.w < 0 ? -1 : 1;
        const cx = q.x * sign;
        const cy = q.y * sign;
        const cz = q.z * sign;
        const cw = q.w * sign;

        const clampedW = Math.max(-1, Math.min(1, cw));
        const halfAngle = Math.acos(clampedW);
        const maxHalf = maxAngleRad / 2;

        if (halfAngle <= maxHalf) {
            return new BABYLON.Quaternion(cx, cy, cz, cw);
        }

        const sinH = Math.sin(halfAngle);
        if (sinH < 1e-6) return BABYLON.Quaternion.Identity();

        const scale = Math.sin(maxHalf) / sinH;
        return new BABYLON.Quaternion(
            cx * scale,
            cy * scale,
            cz * scale,
            Math.cos(maxHalf)
        );
    }

    function clampSwingEllipse(swingQ, twistAxis, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY) {
        swingQ.normalize();

        // Canonicalize to positive-w hemisphere before measuring angle.
        // q and -q represent the same rotation; without this a flipped quaternion
        // (w < 0) would read as ~360° instead of the correct small angle.
        const sign = swingQ.w < 0 ? -1 : 1;
        const qx = swingQ.x * sign, qy = swingQ.y * sign;
        const qz = swingQ.z * sign, qw = swingQ.w * sign;

        const w = Math.max(-1, Math.min(1, qw));
        const halfAngle = Math.acos(w);
        if (halfAngle < 1e-6) return new BABYLON.Quaternion(qx, qy, qz, qw);

        const sinH = Math.sin(halfAngle);
        if (sinH < 1e-6) return new BABYLON.Quaternion(qx, qy, qz, qw);

        // Derive the two swing DOF axes from the actual twist axis so that the
        // ellipse is always measured in the correct perpendicular plane.
        // (Using raw .x/.y was wrong for Up-axis twists like torso/head.)
        const t = twistAxis.normalizeToNew();
        const arbitrary = Math.abs(t.x) < 0.9 ? BABYLON.Axis.X : BABYLON.Axis.Y;
        const swingBasis1 = BABYLON.Vector3.Cross(t, arbitrary).normalize();
        const swingBasis2 = BABYLON.Vector3.Cross(t, swingBasis1).normalize();

        const v = new BABYLON.Vector3(qx, qy, qz);
        const axisX = BABYLON.Vector3.Dot(v, swingBasis1) / sinH;
        const axisY = BABYLON.Vector3.Dot(v, swingBasis2) / sinH;

        const maxX = axisX >= 0 ? maxForwardX : maxBackwardX;
        const maxY = axisY >= 0 ? maxOutwardY : maxInwardY;
        const maxHalfX = maxX / 2;
        const maxHalfY = maxY / 2;

        const denom = Math.sqrt((maxHalfY * axisX) ** 2 + (maxHalfX * axisY) ** 2);
        if (denom < 1e-9) return new BABYLON.Quaternion(qx, qy, qz, qw);

        const ellipseLimit = (maxHalfX * maxHalfY) / denom;
        if (halfAngle <= ellipseLimit) return new BABYLON.Quaternion(qx, qy, qz, qw);

        const scale = Math.sin(ellipseLimit) / sinH;
        return new BABYLON.Quaternion(qx * scale, qy * scale, qz * scale, Math.cos(ellipseLimit)).normalize();
    }
                                              // pos         neg            pos         neg
    function limitSwingTwist(localQ, twistAxis, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY, maxTwistRad, twistRestAngle = 0) {
        // FIX: normalize localQ before decomposition; upstream interpolation or
        // concatenation can produce a slightly non-unit quaternion.
        const q = localQ.clone();
        q.normalize();

        const { swing, twist } = swingTwistDecompose(q, twistAxis);
        const clampedSwing = clampSwingEllipse(swing, twistAxis, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY);

        // FIX (clarification): for pure single-axis twists, left- and right-multiplication
        // commute, so the original order produced the same numeric result. The corrected
        // order below is semantically clearer and safe if the math ever generalises.
        const restCorrection = BABYLON.Quaternion.RotationAxis(twistAxis.normalizeToNew(), -twistRestAngle);
        const twistRelative = restCorrection.multiply(twist);
        const clampedRelative = clampQuatAngle(twistRelative, maxTwistRad);
        const clampedTwist = BABYLON.Quaternion.Inverse(restCorrection).multiply(clampedRelative);

        return clampedSwing.multiply(clampedTwist).normalize();
    }

    function debugQuat_xy(label, q, twistAxis, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY, maxTwistRad, twistRestAngle = 0) {
        q = q.clone();
        q.normalize();

        const axis = twistAxis.normalizeToNew();
        const { swing, twist } = swingTwistDecompose(q, axis);

        // Build the same perpendicular basis used by clampSwingEllipse so that
        // the displayed X/Y components are meaningful for any twist axis.
        const dbArbitrary = Math.abs(axis.x) < 0.9 ? BABYLON.Axis.X : BABYLON.Axis.Y;
        const dbBasis1 = BABYLON.Vector3.Cross(axis, dbArbitrary).normalize();
        const dbBasis2 = BABYLON.Vector3.Cross(axis, dbBasis1).normalize();

        // --- raw swing ---
        const rawSwingW = Math.max(-1, Math.min(1, Math.abs(swing.w)));
        const rawSwingHalf = Math.acos(rawSwingW);
        const rawSwingDeg = rawSwingHalf * 2 * (180 / Math.PI);
        const rawSinSwingH = Math.sin(rawSwingHalf);
        const rawSwingXYZ = new BABYLON.Vector3(swing.x, swing.y, swing.z);
        const rawSwingX = rawSinSwingH > 1e-6 ? (BABYLON.Vector3.Dot(rawSwingXYZ, dbBasis1) / rawSinSwingH) * rawSwingDeg : 0;
        const rawSwingY = rawSinSwingH > 1e-6 ? (BABYLON.Vector3.Dot(rawSwingXYZ, dbBasis2) / rawSinSwingH) * rawSwingDeg : 0;

        // --- raw twist (after rest correction) ---
        const restCorrection = BABYLON.Quaternion.RotationAxis(axis, -twistRestAngle);
        const twistRelative = restCorrection.multiply(twist);
        const rawTwistW = Math.max(-1, Math.min(1, Math.abs(twistRelative.w)));
        const rawTwistDeg = Math.acos(rawTwistW) * 2 * (180 / Math.PI);
        const rawTwistSign = (twistRelative.x * axis.x + twistRelative.y * axis.y + twistRelative.z * axis.z) >= 0 ? '+' : '-';

        // --- clamped swing ---
        const clampedSwing = clampSwingEllipse(swing, axis, maxForwardX, maxBackwardX, maxOutwardY, maxInwardY);
        const swingW = Math.max(-1, Math.min(1, Math.abs(clampedSwing.w)));
        const swingHalf = Math.acos(swingW);
        const swingDeg = swingHalf * 2 * (180 / Math.PI);
        const sinSwingH = Math.sin(swingHalf);
        const clampedSwingXYZ = new BABYLON.Vector3(clampedSwing.x, clampedSwing.y, clampedSwing.z);
        const swingX = sinSwingH > 1e-6 ? (BABYLON.Vector3.Dot(clampedSwingXYZ, dbBasis1) / sinSwingH) * swingDeg : 0;
        const swingY = sinSwingH > 1e-6 ? (BABYLON.Vector3.Dot(clampedSwingXYZ, dbBasis2) / sinSwingH) * swingDeg : 0;

        // --- clamped twist ---
        const clampedTwist = clampQuatAngle(twistRelative, maxTwistRad);
        const twistW = Math.max(-1, Math.min(1, Math.abs(clampedTwist.w)));
        const twistDeg = Math.acos(twistW) * 2 * (180 / Math.PI);
        const twistSign = (clampedTwist.x * axis.x + clampedTwist.y * axis.y + clampedTwist.z * axis.z) >= 0 ? '+' : '-';

        console.log(
            `${label}\n` +
            `  raw     — swing: ${rawSwingDeg.toFixed(1)}° (x:${rawSwingX.toFixed(1)}° y:${rawSwingY.toFixed(1)}°)  twist: ${rawTwistSign}${rawTwistDeg.toFixed(1)}°\n` +
            `  clamped — swing: ${swingDeg.toFixed(1)}° (x:${swingX.toFixed(1)}° y:${swingY.toFixed(1)}°)  twist: ${twistSign}${twistDeg.toFixed(1)}°`
        );
    }

    //extract quaternions from JSON, with defaults if missing
    //-----------------------------------------------------------------------------------------------
    const hip_q = convertQuat(quaternionData["hip_quat"]);
    const torso_q = convertQuat(quaternionData["torso_quat"]);
    const head_q = convertQuat(quaternionData["head_quat"]);

    const l_arm_upper_q = convertQuat(quaternionData["l_arm_upper"]) ;
    const l_arm_lower_q = convertQuat(quaternionData["l_arm_lower"]);
    const l_hand_q = convertQuat(quaternionData["l_hand"]);

    const r_arm_upper_q = convertQuat(quaternionData["r_arm_upper"]);
    const r_arm_lower_q = convertQuat(quaternionData["r_arm_lower"]);
    const r_hand_q = convertQuat(quaternionData["r_hand"]);

    const l_leg_upper_q = convertQuat(quaternionData["l_leg_upper"]);
    const l_leg_lower_q = convertQuat(quaternionData["l_leg_lower"]);
    const l_foot_q = convertQuat(quaternionData["l_foot"]);

    const r_leg_upper_q = convertQuat(quaternionData["r_leg_upper"]);
    const r_leg_lower_q = convertQuat(quaternionData["r_leg_lower"]);
    const r_foot_q = convertQuat(quaternionData["r_foot"]);

    const legs  = BABYLON.Quaternion.FromEulerAngles(0.0, 0, Math.PI);
    const feet  = BABYLON.Quaternion.FromEulerAngles(Math.PI/2, 0, 0.0);
    const arms_l = BABYLON.Quaternion.FromEulerAngles(Math.PI, Math.PI/2, 0);
    const arms_r = BABYLON.Quaternion.FromEulerAngles(Math.PI, -Math.PI/2, 0);

    const DEG = Math.PI / 180;

    //convert to local quats by accounting for parent bone rotations
    //-----------------------------------------------------------------------------------------------
    let torso_l = computeLocalQuat(hip_q, torso_q);
    let head_l = computeLocalQuat(torso_q, head_q);

    let l_shoulder_g = torso_q.multiply(OFFSETS.l_shoulder);
    let r_shoulder_g = torso_q.multiply(OFFSETS.r_shoulder);

    // legs
    //-----------------------------------------------------------------------------------------------
    // Upper legs
    // let l_leg_upper_l_temp = computeLocalQuat(hip_q, l_leg_upper_q);
    // //debugQuat_xy("l_leg_upper", l_leg_upper_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 1*DEG, 1*DEG, 1*DEG, 360*DEG, 0*DEG);
    // l_leg_upper_l_constrained= limitSwingTwist(l_leg_upper_l_temp, new BABYLON.Vector3(0, 1, 0), 60*DEG, 60*DEG, 90*DEG, 45*DEG, 25*DEG);
    // l_leg_upper_l_constrained = smoothJoint("l_leg_upper", l_leg_upper_l_constrained);
    // l_leg_upper_q_constrained = computeGlobalQuat(hip_q, l_leg_upper_l_constrained);
    let l_leg_upper_l = computeLocalQuat(hip_q, l_leg_upper_q.multiply(legs));

    // let r_leg_upper_l_temp = computeLocalQuat(hip_q, r_leg_upper_q);
    // //debugQuat_xy("r_leg_upper", r_leg_upper_l_temp, new BABYLON.Vector3(0, 1, 0), 5*DEG, 5*DEG, 90*DEG, 90*DEG, 45*DEG, 25*DEG);
    // r_leg_upper_l_constrained = limitSwingTwist(r_leg_upper_l_temp, new BABYLON.Vector3(0, 1, 0), 5*DEG, 5*DEG, 90*DEG, 45*DEG, 25*DEG);
    // r_leg_upper_l_constrained = smoothJoint("r_leg_upper", r_leg_upper_l_constrained);
    // r_leg_upper_q_constrained = computeGlobalQuat(hip_q, r_leg_upper_l_constrained);
    let r_leg_upper_l = computeLocalQuat(hip_q, r_leg_upper_q.multiply(legs));

    // Lower legs 
    // let l_leg_lower_l_temp = computeLocalQuat(l_leg_upper_q, l_leg_lower_q);
    // //debugQuat_xy("l_leg_lower", l_leg_lower_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 1*DEG, 1*DEG, 1*DEG, 360*DEG, 0*DEG);
    // l_leg_lower_l_constrained = limitSwingTwist(l_leg_lower_l_temp, new BABYLON.Vector3(0, 1, 0), 15*DEG, 15*DEG, 5*DEG, 140*DEG, 25*DEG);
    // l_leg_lower_l_constrained = smoothJoint("l_leg_lower", l_leg_lower_l_constrained);
    // l_leg_lower_q_constrained = computeGlobalQuat(l_leg_upper_q, l_leg_lower_l_constrained);
    let l_leg_lower_l = computeLocalQuat(l_leg_upper_q.multiply(legs), l_leg_lower_q.multiply(legs));

    // let r_leg_lower_l_temp = computeLocalQuat(r_leg_upper_q, r_leg_lower_q);
    // //debugQuat_xy("r_leg_lower", r_leg_lower_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 1*DEG, 1*DEG, 1*DEG, 360*DEG, 0*DEG);
    // r_leg_lower_l_constrained = limitSwingTwist(r_leg_lower_l_temp, new BABYLON.Vector3(0, 1, 0), 15*DEG, 15*DEG, 5*DEG, 140*DEG, 25*DEG);
    // r_leg_lower_l_constrained = smoothJoint("r_leg_lower", r_leg_lower_l_constrained);
    // r_leg_lower_q_constrained = computeGlobalQuat(r_leg_upper_q, r_leg_lower_l_constrained);
    let r_leg_lower_l = computeLocalQuat(r_leg_upper_q.multiply(legs), r_leg_lower_q.multiply(legs));

    // feet
    // let l_foot_l_temp = computeLocalQuat(l_leg_lower_q, l_foot_q);
    // //debugQuat_xy("l_foot", l_foot_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 1*DEG, 1*DEG, 1*DEG, 360*DEG, 0*DEG);
    // l_foot_l_constrained = limitSwingTwist(l_foot_l_temp, new BABYLON.Vector3(0, 1, 0), 3*DEG, 3*DEG, 45*DEG, 45*DEG, 10*DEG);
    // l_foot_l_constrained = smoothJoint("l_foot", l_foot_l_constrained);
    // l_foot_q_constrained = computeGlobalQuat(l_leg_lower_q, l_foot_l_constrained);
    let l_foot_l = computeLocalQuat(l_leg_lower_q, l_foot_q.multiply(feet));

    // let r_foot_l_temp = computeLocalQuat(r_leg_lower_q, r_foot_q);
    // //debugQuat_xy("r_foot", r_foot_l_temp, rotatedAxis, 360*DEG, 1*DEG, 1*DEG, 1*DEG, 360*DEG, 0*DEG);
    // r_foot_l_constrained = limitSwingTwist(r_foot_l_temp, new BABYLON.Vector3(0, 1, 0), 3*DEG, 3*DEG, 45*DEG, 45*DEG, 10*DEG, 0*DEG);
    // r_foot_l_constrained = smoothJoint("r_foot", r_foot_l_constrained);
    // r_foot_q_constrained = computeGlobalQuat(r_leg_lower_q, r_foot_l_constrained);
    let r_foot_l = computeLocalQuat(r_leg_lower_q, r_foot_q.multiply(feet)); 

    // arms //-----------------------------------------------------------------------------------------------
    //
    //uppper arms
    // let l_arm_upper_l_temp = computeLocalQuat(torso_q, l_arm_upper_q);
    // debugQuat_xy("l_arm_upper", l_arm_upper_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 360*DEG, 1*DEG, 1*DEG, 360*DEG);
    // l_arm_upper_l_constrained = limitSwingTwist(l_arm_upper_l_temp, new BABYLON.Vector3(0, 1, 0), 1*DEG, 1*DEG, 1*DEG, 1*DEG, 360*DEG);
    // l_arm_upper_l_constrained = smoothJoint("l_arm_upper", l_arm_upper_l_constrained);
    // l_arm_upper_q_constrained = computeGlobalQuat(torso_q, l_arm_upper_l_constrained);
    let l_arm_upper_l = computeLocalQuat(l_shoulder_g, l_arm_upper_q.multiply(arms_l));

    // let r_arm_upper_l_temp = computeLocalQuat(torso_q, r_arm_upper_q);
    // debugQuat_xy("r_arm_upper", r_arm_upper_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 1*DEG, 1*DEG, 1*DEG, 360*DEG, 0*DEG);
    // let r_arm_upper_l_constrained = limitSwingTwist(r_arm_upper_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 360*DEG);
    // r_arm_upper_l_constrained = smoothJoint("r_arm_upper", r_arm_upper_l_constrained);
    // let r_arm_upper_q_constrained = computeGlobalQuat(torso_q, r_arm_upper_l_constrained);
    let r_arm_upper_l = computeLocalQuat(r_shoulder_g, r_arm_upper_q.multiply(arms_r));

    //lower arms 
    // let l_arm_lower_l_temp = computeLocalQuat(l_arm_upper_q, l_arm_lower_q);
    // //debugQuat_xy("l_arm_lower", l_arm_lower_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 360*DEG);
    // let l_arm_lower_l_constrained = limitSwingTwist(l_arm_lower_l_temp, new BABYLON.Vector3(0, 1, 0), 40*DEG, 40*DEG, 160*DEG, 1*DEG, 80*DEG);
    // l_arm_lower_l_constrained = smoothJoint("l_arm_lower", l_arm_lower_l_constrained);
    // let l_arm_lower_q_constrained = computeGlobalQuat(l_arm_upper_q, l_arm_lower_l_constrained);
    let l_arm_lower_l = computeLocalQuat(l_arm_upper_q.multiply(arms_l), l_arm_lower_q.multiply(arms_l));

    // let r_arm_lower_l_temp = computeLocalQuat(r_arm_upper_q, r_arm_lower_q);
    // //debugQuat_xy("r_arm_lower", r_arm_lower_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 360*DEG);
    // let r_arm_lower_l_constrained = limitSwingTwist(r_arm_lower_l_temp, new BABYLON.Vector3(0, 1, 0), 40*DEG, 40*DEG, 160*DEG, 1*DEG, 80*DEG);
    // r_arm_lower_l_constrained = smoothJoint("r_arm_lower", r_arm_lower_l_constrained);
    // let r_arm_lower_q_constrained = computeGlobalQuat(r_arm_upper_q, r_arm_lower_l_constrained);√
    let r_arm_lower_l = computeLocalQuat(r_arm_upper_q.multiply(arms_r), r_arm_lower_q.multiply(arms_r));

    //hands
    // let l_hand_l_temp = computeLocalQuat(l_arm_lower_q, l_hand_q);
    // //debugQuat_xy("l_hand", l_hand_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 360*DEG);
    // let l_hand_l_constrained = limitSwingTwist(l_hand_l_temp, new BABYLON.Vector3(0, 1, 0), 60*DEG, 60*DEG, 60*DEG, 60*DEG, 5*DEG);
    // l_hand_l_constrained = smoothJoint("l_hand", l_hand_l_constrained);
    // let l_hand_q_constrained = computeGlobalQuat(l_arm_lower_q, l_hand_l_constrained);
    let l_hand_l = computeLocalQuat(l_arm_lower_q.multiply(arms_l), l_hand_q.multiply(arms_l));

    // let r_hand_l_temp = computeLocalQuat(r_arm_lower_q, r_hand_q);
    // //debugQuat_xy("r_hand", r_hand_l_temp, new BABYLON.Vector3(0, 1, 0), 360*DEG, 360*DEG, 360*DEG, 360*DEG, 360*DEG);
    // let r_hand_l_constrained = limitSwingTwist(r_hand_l_temp, new BABYLON.Vector3(0, 1, 0), 60*DEG, 60*DEG, 60*DEG, 60*DEG, 5*DEG);
    // r_hand_l_constrained = smoothJoint("r_hand", r_hand_l_constrained);
    // let r_hand_q_constrained = computeGlobalQuat(r_arm_lower_q, r_hand_l_constrained);
    let r_hand_l = computeLocalQuat(r_arm_lower_q.multiply(arms_r), r_hand_q.multiply(arms_r));

    
    //apply quaternions to skeleton bones
    //-----------------------------------------------------------------------------------------------
    skeleton.bones[0].getTransformNode().rotationQuaternion = hip_q;
    skeleton.bones[3].getTransformNode().rotationQuaternion = torso_l;
    skeleton.bones[5].getTransformNode().rotationQuaternion = head_l;  

    //skeleton.bones[9].getTransformNode().rotationQuaternion = OFFSETS.l_shoulder;
    skeleton.bones[10].getTransformNode().rotationQuaternion = l_arm_upper_l;
    skeleton.bones[11].getTransformNode().rotationQuaternion = l_arm_lower_l;
    skeleton.bones[12].getTransformNode().rotationQuaternion = l_hand_l;

    //skeleton.bones[33].getTransformNode().rotationQuaternion = OFFSETS.r_shoulder;
    skeleton.bones[34].getTransformNode().rotationQuaternion = r_arm_upper_l;
    skeleton.bones[35].getTransformNode().rotationQuaternion = r_arm_lower_l;
    skeleton.bones[36].getTransformNode().rotationQuaternion = r_hand_l;

    skeleton.bones[62].getTransformNode().rotationQuaternion = r_leg_upper_l;
    skeleton.bones[63].getTransformNode().rotationQuaternion = r_leg_lower_l;
    skeleton.bones[64].getTransformNode().rotationQuaternion = r_foot_l;

    skeleton.bones[57].getTransformNode().rotationQuaternion = l_leg_upper_l;
    skeleton.bones[58].getTransformNode().rotationQuaternion = l_leg_lower_l;
    skeleton.bones[59].getTransformNode().rotationQuaternion = l_foot_l;

    return skeleton
}
