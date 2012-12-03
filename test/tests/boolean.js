var bool = {
   "_type": "boolean"
}

var schema = {
   "bool": bool
}

var tests = [{
   "name": "True",
   "data": true,
   "type": "bool"
},
{
   "name": "False",
   "data": false,
   "type": "bool"
},
{
   "name": "Boolean fail",
   "fail": true,
   "data": "potato",
   "type": "bool"
}]
