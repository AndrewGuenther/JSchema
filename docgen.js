docHeader = '<head><style type="text/css">h3 {border-style: solid; padding:4px;}</style></head>'

function getProperties(schema) {
    var props = ''
    if (schema['_required']) props += '[Required]';
    if (schema['_singular'] != 'undefined' && schema['_singular'] == false) props += '[Not Singular]';
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
    return html;
}

function generateDocHTML(schemas, name) {
    var html = "<html>";
    if (!name) name = "schema";
    html += "<h1>"+name+"</h1>";
    html += docHeader;
    for (schema in schemas) {
        if (schema[0] != '_')
        html += generateSchemaHTML(schema, schemas[schema]);
    }
    html += "</html>"
    print(html);
}

if (typeof schema != 'undefined') {
    generateDocHTML(schema);
} else {
    print("No schema found.");
}

