var name = {
   "_type": "object",
   "_doc": "The name of a given individual",
   
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
   "_doc": "A reference to the record of another individual.",

   "REF": {
      "_type": "string",
      "_validate": JSchema.regex("^.{10}$")
   },

   "RELN": {
      "_doc": "Describes the nature of the relationship",
      "_type": "string"
   }
};

var time = {
   "_type": "string",
   "_doc": "A string representing a time."
//   "_validate": Schema.date("hh:mm:ss?.fs?")
};

var date = {
   "_type": "string",
   "_doc": "A string representing a date."
//   "_validate": Schema.date("dd mon yyyy")
};

var fileRef = {
	"_type": "string",
   "_doc": "A reference to a file."
	//Validate the file URL exists?
}

var chan = {
   "_type": "object",
   "_doc": "When the record was last changed.",

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
    "_doc": "The address of the given individual.",

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
   "_doc": "A document representing a description of a person.",

   "NAME": {
      "_type": "name",
      "_required": true
   },

   "RESN": {
      "_type": "string",
      "_required": false,
      "_validate": JSchema.isIn(["locked","privacy"])
   },
   
   "INDATT": {
	  "_type": "individualAttr",
	  "_singular": false
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
   },
   
   "MEDIA": {
	  "_type": "multimedia",
	  "_singular": false
   }
};

var multimedia = {
	"_type": "object",
	
	"FORM": {
		"_type": "string",
		"_required": true,
		"_validate": JSchema.isIn(["bmp", "gif", "jpeg", "ole", "pcx", "tiff", "wav"])
	},
	
	"TITL": {
		"_type": "string"
	},
	
	"FILE": {
		"_type": "fileRef",
		"_required": true
	}
};

var individualAttr = {
	"_type": "object",
	
	//TODO: this is supposed to be an array of things where 1 or more is required
	
	"ATTR": {
		"_type": "string",
		"_required": true,
		"_validate": JSchema.isIn([
			"CAST", 
			"DSCR",
			"EDUC",
			"IDNO",
			"NATI",
			"NCHI",
			"NMR",
			"OCCU",
			"PROP",
			"RELI",
			"RESI",
			"SSN",
			"TITL"])
	},
	
	"DETAIL": {
		"_type": "evt_detail"
	}
};

var schema = {
   "_name": "Family Tree",
   "individual": individual,
   "multimedia": multimedia,
   "individualAttr": individualAttr,
   "name": name,
   "xref": xref,
   "date": date,
   "fileRef": fileRef,
   "time": time,
   "chan": chan,
   "evt": evt,
   "evt_detail": evt_detail
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
