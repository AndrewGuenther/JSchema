function isCow(str) {
   return str == "cow";
}

var cow = {
   "_type": "string",
   "_validate": isCow
}

var schema = {
   "cow": cow
}

var tests = [{
   "data": "cow",
   "type": "cow"
},
{
   "data": "notcow",
   "type": "cow"
}]
