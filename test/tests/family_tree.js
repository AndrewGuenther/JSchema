var name = {
   "_type": "object",
   
   "NAME": {
      "_type": "string",
      "_required": true
   },
   "GIVN": {
      "_type": "string",
   },
   "NICK": {
      "_type": "string",
   },
   "SPFX": {
      "_type": "string",
   },
   "NSFX": {
      "_type": "string",
   }
}

var xref = {
   "_type": "object",

   "REF": {
      "_type": "string",
      "_validate": JSchema.regex("^.{10}$")
   },

   "RELN": {
      "_type": "string"
   }
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

   "NAME": {
      "_type": "name",
      "_required": true
   },

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


   "ASSOC": {
      "_type": "xref",
      "_singular": false
   },

   "CHAN": {
      "_type": "chan",
      "_required": false,
      "_singular": true
   }
};

var schema = {
   "individual": individual,
   "name": name,
   "xref": xref,
   "date": date,
   "time": time,
   "chan": chan
};

var tests = [{
   "name": "Valid individual",
   "data": {
      "NAME": {
         "NAME": "Andrew Guenther"
      },
      "RESN": "locked",
      "SEX": "M",
      "CHAN": {
         "DATE": "today",
         "TIME": "right now"
      },
      "ASSOC": [{
         "REF": "0123456789",
         "RELN": "father"
      }]
   },
   "type": "individual"
},
{
   "name": "Invalid individual",
   "fail": true,
   "data": {
      "SEX": "fdsa"
   },
   "type": "individual"
}];
