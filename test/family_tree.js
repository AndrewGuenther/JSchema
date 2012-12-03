var ref = {
   "_type": "string",
   "_required": false,
   "_singular": false
};
var time = {
   "_type": "string"//,
//   "_validate": Schema.date("hh:mm:ss?.fs?")
};

var date = {
   "_type": "string"//,
//   "_validate": Schema.date("dd mon yyyy")
};

var chan = {
   "_type": "object",

   "DATE": {
      "_type": "date",
      "_required": true,
      "_singular": true
   },

   "TIME": {
      "_type": "time",
      "_required": false,
      "_singular": true
   }
};

var individual = {
   "_type": "object",

   "RESN": {
      "_type": "string",
      "_required": false,
      "_validate": JSchema.isIn(["locked","privacy"])
   },

   "SEX": {
      "_type": "string",
      "_required": false,
      "_validate": JSchema.isIn(["M", "F"])
   },

   "SUBM": {
      "_type": "ref"
   },

   "ALIA": {
      "_type": "ref"
   },

   "ANCI": {
      "_type": "ref"
   },

   "DESI": {
      "_type": "ref"
   },

   "CHAN": {
      "_type": "chan",
      "_required": false,
      "_singular": true
   }
};

var schema = {
   "individual": individual,
   "ref": ref,
   "date": date,
   "time": time,
   "chan": chan
};

var tests = [{
   "data": {
      "RESN": "locked",
      "SEX": "M",
      "CHAN": {
         "DATE": "today",
         "TIME": "right now"
      }
   },
   "type": "individual"
},
{
   "data": {
      "SEX": "fdsa"
   },
   "type": "individual"
}];
