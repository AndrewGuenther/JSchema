var a = {
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
}

var b = {
   "SEX": "fdsa"
}

evala = "v_insert('data', "+tojson(a)+", 'individual')"
evalb = "v_insert('data', "+tojson(b)+", 'individual')"

print(db.eval(evala));
print(db.eval(evalb));
