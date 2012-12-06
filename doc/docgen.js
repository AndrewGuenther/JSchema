var docHeader = '<head><style type="text/css">h3 {border-style: solid; padding:4px;}</style></head>'

function getProperties(schema) {
    var props = '<ul>';
    if (schema['_required']) props += '<li>Required</li>';
//    if (schema['_singular'] != 'undefined' && schema['_singular'] == false) props += '<li>Not Singular</li>';
    if (schema['_strict']) props += '<li>Strict</li>';
    props += '</ul>';
    return props;
}

function generateAttributesHTML(schema) {
    var html = '<ul>';
    var hasAttr = false;
    for (attr in schema) {
        if (attr[0] != '_') {
            subSchema = schema[attr]
            hasAttr = true;
            html += '<div><div>'+attr+' ';
            if ('_singular' in subSchema && !subSchema._singular) html += '[';
            html += '<a href=#'+subSchema['_type']+'>'+subSchema['_type']+'</a>'
            if ('_singular' in subSchema && !subSchema._singular) html += ']';
            if (subSchema['_doc']) html += ': ' +subSchema['_doc']
            html += '</div>'
            html += getProperties(subSchema);
            html += '</div>'
        }
    }
    html += '</ul>'
    if (hasAttr) return html
    return ""
}

function generateSchemaHTML(type, schema) {
    var html = '<h3 id="'+type+'">'+type+'</h3>'
    if (schema['_doc']) html += '<p>'+schema['_doc']+'</p>'
    html += '<div>Type: '+schema['_type']+'</div>'
    html += '<div>'+getProperties(schema)+'</div>'
    html += generateAttributesHTML(schema);
    return html;
}

function generateDocHTML(schemas, name) {
    var html = "<html>";
    if (!name) name = "schema";
    html += docHeader;
    html += "<h1>"+name+"</h1>";
    for (schema in schemas) {
        if (schema[0] != '_')
        html += generateSchemaHTML(schema, schemas[schema]);
    }
    html += "</html>"
    print(html);
}

if (typeof schema != 'undefined') {
    generateDocHTML(schema, schema._name);
} else {
    print("No schema found.");
}

