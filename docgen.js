var name = {
   "_type": "object",
   
   "NAME": {
      "_type": "string",
      "_required": true
   },
   "GIVN": {
      "_type": "string",
   },
   "NICK": {
      "_type": "string",
   },
   "SPFX": {
      "_type": "string",
   },
   "NSFX": {
      "_type": "string",
   }
}

var xref = {
   "_type": "object",

   "REF": {
      "_type": "string"//,
//      "_validate": JSchema.regex("^.{10}$")
   },

   "RELN": {
      "_type": "string"
   }
};

var time = {
   "_type": "string"//,
//   "_validate": Schema.date("hh:mm:ss?.fs?")
};

var date = {
   "_type": "string"//,
//   "_validate": Schema.date("dd mon yyyy")
};

var chan = {
   "_type": "object",

   "DATE": {
      "_type": "date",
      "_required": true,
      "_singular": true
   },

   "TIME": {
      "_doc": "Time of day.",
      "_type": "time",
      "_required": false,
      "_singular": true
   }
};

var individual = {
   "_type": "object",

   "NAME": {
      "_type": "name",
      "_required": true
   },

   "RESN": {
      "_type": "string",
      "_required": false//,
//      "_validate": JSchema.isIn(["locked","privacy"])
   },

   "SEX": {
      "_type": "string",
      "_required": false//,
//      "_validate": JSchema.isIn(["M", "F"])
   },


   "ASSOC": {
      "_type": "xref",
      "_singular": false
   },

   "CHAN": {
      "_type": "chan",
      "_required": false,
      "_singular": true
   }
};

var schema = {
   "_id": "data",
   "individual": individual,
   "name": name,
   "xref": xref,
   "date": date,
   "time": time,
   "chan": chan
};

docHeader = "<head></head>"

function getProperties(schema) {
    var props = ''
    if (schema['_required']) props += '[Required]';
    if (schema['_singular']) props += '[Singular]';
    if (schema['_strict']) props += '[Strict]';
    return props;
}

function generateAttributesHTML(schema) {
    var html = '<ul>';
    var hasAttr = false;
    for (attr in schema) {
        if (attr[0] != '_') {
            subSchema = schema[attr]
            hasAttr = true;
            html += '<li>'+getProperties(subSchema);
            html += ' <a href=#'+subSchema['_type']+'>'+subSchema['_type']+'</a> '
            html += attr
            if (subSchema['_doc']) html += ' - ' +subSchema['_doc']
            html += '</li>'
        }
    }
    html += '</ul>'
    if (hasAttr) return html
    return ""
}

function generateSchemaHTML(type, schema) {
    var html = '<h3 id="'+type+'">'+type+'</h3>'
    if (schema['_doc']) html += '<p>'+schema['_doc']+'</p>'
    html += '<p>Type: '+getProperties(schema)+' '+schema['_type']+'</p>'
    html += generateAttributesHTML(schema);
    return html
}

function generateDocHTML(schemas) {
    var html = "<html>";
    html += docHeader;
    for (schema in schemas) {
        if (schema[0] != '_')
        html += generateSchemaHTML(schema, schemas[schema]);
    }
    html += "</html>"
    writeToFile("schemaDoc.html",html);
}


function writeToFile(file, content) {
    var fs = require('fs');
    fs.writeFile(file, content, function(err) {
    if(err) {
        console.log(content);
    } else {
        console.log("Doc Created!");
    }
}); 
}

generateDocHTML(schema);