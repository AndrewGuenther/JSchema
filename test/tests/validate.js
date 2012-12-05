var isCow = 'function (str) { return str == "cow"; }'

var cow = {
   "_type": "string",
   "_validate": isCow
}

var schema = {
   "cow": cow
}

var tests = [{
   "name": "Valid isCow",
   "data": "cow",
   "type": "cow"
},
{
   "name": "Invalid isCow",
   "fail": true,
   "data": "notcow",
   "type": "cow"
}]
