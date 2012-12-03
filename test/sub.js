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
   "data": "a",
   "type": "sub"
},
{
   "data": false,
   "type": "sub"
}]
