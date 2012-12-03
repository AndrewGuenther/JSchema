var isin = {
   "_type": "number",
   "_validate": JSchema.isIn([1, 2])
}

var schema = {
   "isin": isin
}

var tests = [{
   "data": 1,
   "type": "isin"
},
{
   "data": 3,
   "type": "isin"
}]
