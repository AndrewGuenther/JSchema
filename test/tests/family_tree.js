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

var fileRef = {
	"_type": "string"
	//Validate the file URL exists?
}

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
   "individual": individual,
   "multimedia": multimedia,
   "individualAttr": individualAttr,
   "name": name,
   "xref": xref,
   "date": date,
   "fileRef": fileRef,
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
