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

var place = {
    "_type" : "string",
    "_required" : true
};

var phone = {
    "_type" : "string"
};

var address = {
    "_type" : "object",

    "ADDR" : {
        "_type" : "string"
    },
    "CONT" : {
        "_type" : "string",
        "_singular" : true
    },
    "ADR1" : {
        "_type" : "string"
    },
    "ADR2" : {
        "_type" : "string"
    },
    "CITY" : {
        "_type" : "string"
    },
    "STAE" : {
        "_type" : "string"
    },
    "POST" : {
        "_type" : "number",
        "_validate" : JSchema.inRange(0, 99999)
    },
    "CTRY" : {
        "_type" : "string"
    },
    "PHON0" : {
        "_type" : "phone"
    },
    "PHON1" : {
        "_type" : "phone"
    },
    "PHON2" : {
        "_type" : "phone"
    }
};

var evt_detail = {
    "_type" : "object",

    "TYPE" : {
        "_type" : "string"
    },
    "DATE" : {
        "_type" : "date"
    },
    "PLAC" : {
        "_type" : "place"
    },
    "ADDR" : {
        "_type" : "address"
    },
    "AGE" : {
        "_type" : "number"
    },
    "AGNC" : {
        "_type" : "string"
    },
    "CAUSE" : {
        "_type" : "string"
    },
    "MULT" : {
        "_type" : "multimedia",
        "_singular" : false
    }
};

var evt = {
    "_type" : "object",

    "EVENT" : {
        "_type" : "string",
        "_required" : true,
        "_validate" : JSchema.isIn(["BIRT", "CHR", "DEAT", "BURI", "CREM", "BAPM", "BARM", "BASM", "BLES", "CHRA", "CONF", "FCOM", "ORDN", "NATU", "EMIG", "IMMI", "CENS", "PROB", "WILL", "GRAD", "RETI", "EVEN"])
    },

    "DETAIL" : {
        "_type" : "evt_detail"
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
