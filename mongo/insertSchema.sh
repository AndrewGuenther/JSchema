if [ $# -ne 3 ]
then
    echo "Error in $0 - Invalid Argument Count"
    echo "Syntax: $0 [schema_file] [database] [collection]"
    exit
fi

insertion="schema['_id'] = '"$3"'; db.schema.save(schema);"

rm .insert.tmp 2> /dev/null

cat $1 >> .insert.tmp
echo $insertion >> .insert.tmp

rm schemaDoc.html 2> /dev/null 
mongo $2 .insert.tmp ../doc/docgen.js | grep '^<' >> schemaDoc.html 

rm .insert.tmp