var ref = {
   "_type": "string",
   "_required": false,
   "_singular": false
};
var time = {
   "_type": "string",
   "_validate": Schema.date("hh:mm:ss?.fs?")
};

var date = {
   "_type": "string",
   "_validate": Schema.date("dd mon yyyy")
};

var chan = {
   "_type": "object",

   "DATE": {
      "_type": date,
      "_required": true,
      "_singular": true
   },

   "TIME": {
      "_type": time,
      "_required": false,
      "_singular": true
   }
};

var individual = {
   "_type": "object",
   "_required": true,

   "RESN": {
      "_type": "string",
      "_required": false,
      "_validate": Schema.isIn(["locked","privacy"])
   },

   "SEX": {
      "_type": "string",
      "_required": false,
      "_validate": Schema.isIn(["M", "F"])
   },

   "SUBM": {
      "_type": ref
   },

   "ALIA": {
      "_type": ref
   },

   "ANCI": {
      "_type": ref
   },

   "DESI": {
      "_type": ref
   },

   "CHAN": {
      "_type": chan,
      "_required": false,
      "_singular": true
   }
};
