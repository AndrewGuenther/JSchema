var x = {
   "_type": "string"
}

var sub = {
   "_type": "x"
}

var schema = {
   "sub": sub,
   "x": x
}

var tests = [{
   "name": "Valid subtype",
   "data": "a",
   "type": "sub"
},
{
   "name": "Invalid subtype",
   "fail": true,
   "data": false,
   "type": "sub"
}]
