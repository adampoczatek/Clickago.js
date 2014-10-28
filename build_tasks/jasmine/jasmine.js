module.exports = {
    unit: {
      src: "<%= buildDest %>/<%= pkg.name %>.min.js",
      options: {
        specs: "test/**/*Spec.js"
      }
    }
};