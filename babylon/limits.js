var pitch_limit = 1.256;
var roll_limit = 0.8;
var yaw_limit = 1.134;

// Neck Movement
var pitch_neck_limit = [-0.576, 0.837];
var roll_neck_limit = [-0.576, 0.576];
var yaw_neck_limit = [-0.471,0.471];

// Head/Atlas Movement
var pitch_head_limit = [-0.279, 0.419];
var roll_head_limit = [-0.105, 0.105];
var yaw_head_limit = [-0.663,0.663];

function vectorChange( vec, vec2)
{
	return Math.abs(Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z)-Math.sqrt(vec2.x*vec2.x + vec2.y*vec2.y + vec2.z*vec2.z));
}

function limitangleRight(a)
{
	if (a>Math.PI/2.0)
	{
		return -(Math.PI-a);
	}
	else if (a-Math.PI/2.0) 
	{
		return (-Math.PI-a);
	}   
	else
	{
		return a;
	}
}

function limitangleLeft(a)
{
	if (a>Math.PI/2.0)
	{
		return -(Math.PI-a);
	}
	else if (a<-Math.PI/2.0) 
	{
		return (-Math.PI-a);
	}   
	else
	{
		return a;
	}
}

function limitangleLeft(a)
{
	if (a>Math.PI/2.0)
	{
		return -(Math.PI-a);
	}
	else if (a<-Math.PI/2.0) 
	{
		return (-Math.PI-a);
	}   
	else
	{
		return a;
	}
}

function limitangle(a,limit)
{
	if (a>limit)
	{
		return limit;
	}
	else if (a<-limit) 
	{
		return -limit
	}   
	else
	{
		return a;
	}
}

function fix_theta_3(val)
{
	if (val > Math.PI/2.0){
		return val - Math.PI;
	} 
	else if (val < -Math.PI/2.0)
	{
		return val + Math.PI;
	} else
	{
		return val;
	}
}

function sanitise(a)
{
	let rtn = a;
	if (a < -Math.PI/2.0)
	{
		rtn = a+2*Math.pi;
	}
	return -rtn+Math.pi;
	//return -a;
}

function limit(a)
{
	if ( a < -Math.PI )
	{
		return a + 2*Math.PI;
	}
	if ( a > Math.PI )
	{
		return a - 2*Math.PI;
	}
	return a;
}

function MapAxis( value, in_max, out_max)
{
	let ratio = 7.0 / in_max; 
	let out = 2.0/ ( 1. + Math.pow(Math.E, - (ratio*value))) - 1.0;
	return out*out_max
}

function AngleLimit(value,limit_neck,limit_head)
{
	let output = {};
	output['head'] = 0.0;
	output['neck'] = 0.0;
	_head_perc = 0.5
	_neck_perc = 0.5
	if( value > 0 )
	{
		_limit = limit_neck[1]+limit_head[1]
		_head_perc = limit_head[1]/_limit
		_neck_perc = limit_neck[1]/_limit
		if (value > _limit)
		{
			value = _limit
		}
	}
	if( value < 0 )
	{
		_limit = limit_neck[0]+limit_head[0]
		_head_perc = limit_head[0]/_limit
		_neck_perc = limit_neck[0]/_limit
		if (value < _limit)
		{
			value = _limit
		}                
	}
	output['neck'] = _neck_perc * value
	output['head'] = _head_perc * value
	return output;
}

function BodyCollision(mesh_name)
{
	let _i = scene.skeletons[0].getBoneIndexByName(mesh_name);
	let v3 = scene.skeletons[0].bones[_i].getAbsolutePosition();
	let b_min = scene.getMeshByName('Wolf3D_Outfit_Top').getBoundingInfo().boundingBox.minimum;
	let b_max = scene.getMeshByName('Wolf3D_Outfit_Top').getBoundingInfo().boundingBox.maximum;
		
	let _x = false;
	let _y = false;
	let _z = false;
	if ((v3.x > b_min.x) && (v3.x < b_max.x))
	{
		_x = true;
	}
	// if ((v3.y > b_min.y) && (v3.y < b_max.y))
	// {
	// 	_y = true;
	// }
	// if ((v3.z > b_min.z) && (v3.z < b_max.z ))
	// {
	// 	_z = true;
	// }
	if( _x )// && _y && _z)
	{
		return true;
	} else
	{
		return false;
	}
}