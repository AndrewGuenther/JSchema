var string = {
   "_type": "string",
}

var schema = {
   "string": string
}

var tests = [{
   "name": "Valid string",
   "data": "potato",
   "type": "string"
},
{
   "name": "Invalid string",
   "fail": true,
   "data": 1,
   "type": "string"
}]
