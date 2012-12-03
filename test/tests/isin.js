var isin = {
   "_type": "number",
   "_validate": JSchema.isIn([1, 2])
}

var schema = {
   "isin": isin
}

var tests = [{
   "name": "Valid isIn",
   "data": 1,
   "type": "isin"
},
{
   "name": "Invalid isIn",
   "fail": true,
   "data": 3,
   "type": "isin"
}]
