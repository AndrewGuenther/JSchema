function isCow(str) {
   return str == "cow";
}

var schema = {
   "_type": "string",
   "_validate": isCow
}

var tests = ["cow", "notcow"]
