#! /bin/bash
curl my.ip.fi -o ip.txt
perl -pi -e 's/\n//g' ip.txt
cat index_head.txt ip.txt index_tail.txt > index.html
mv index.html /app/babylon/index.html
flask run --host=0.0.0.0 &
