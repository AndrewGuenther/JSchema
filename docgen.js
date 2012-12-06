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

function generateDocHTML(name, schemas) {
    var html = "<html>";
    html += docHeader;
    for (schema in schemas) {
        if (schema[0] != '_')
        html += generateSchemaHTML(schema, schemas[schema]);
    }
    html += "</html>"
    writeToFile(name+"Doc.html",html);
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

if (process.argv.length < 3) {
    console.log("No schema provided!");
} else {
    doc = require('./'+process.argv[2]);
    var filename = process.argv[2].replace(/^.*[\\\/]/, '')
    var filename = filename.substr(0, filename.lastIndexOf('.'));
    if (typeof schema != 'undefined') {
        generateDocHTML(filename, schema);
    } else {
        console.log("No schema found in module.");
    }
}

