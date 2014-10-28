module.exports = {
    unit: {
      src: "<%= buildDest %>/<%= pkg.name %>.globals.min.js",
      options: {
        specs: "test/**/*Spec.js"
      }
    }
};