var s = new JSchema(schema)

tests.forEach(function(elem) {
   s.validate(elem);
});

