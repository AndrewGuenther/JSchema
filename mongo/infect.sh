top='function v_insert(collection, obj, type) {'
bottom='
   var schema = db.schema.findOne({"_id": collection});
   var validator = new JSchema(schema);

   try {   
      validator.validate(obj, type);
   } catch(err if err instanceof JSchema.JSchemaError) {
      return {"success": false, "message": err.message};
   }

   db[collection].save(obj);
   return {"success": true};
};

db.system.js.save( {"_id": "v_insert", "value": v_insert} )
'

rm .infect.tmp 2> /dev/null
echo $top >> .infect.tmp
cat ../schema.js >> .infect.tmp
echo $bottom >> .infect.tmp

mongo $1 .infect.tmp
rm .infect.tmp
