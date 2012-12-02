cat ../schema.js $1 test.js > .test.tmp

rhino .test.tmp

rm .test.tmp
