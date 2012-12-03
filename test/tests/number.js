var number = {
   "_type": "number"
}

var schema = {
   "number": number
}

var tests = [{
   "name": "Valid number",
   "data": 1,
   "type": "number"
},
{
   "name": "Invalid number",
   "fail": true,
   "data": "potato",
   "type": "number"
}]
