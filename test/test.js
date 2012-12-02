var s = new Schema(schema)

tests.forEach(function(elem) {
   s.validate(elem);
});

