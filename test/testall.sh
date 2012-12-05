for f in tests/*.js; do
   echo $f
   ./test.sh $f
done
