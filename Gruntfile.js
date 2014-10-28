module.exports = function (grunt) {
    var matchdep;

    matchdep = require("matchdep");

    matchdep.filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        buildDest: "./dist",
        srcDest: "./src",
        srcFiles: [
            "./src/**/*.js"
        ],

        uglify: require("./build_tasks/uglify/uglify.js"),
        
        transpile: require("./build_tasks/transpile/transpile.js"),
        
        jasmine: require("./build_tasks/jasmine/jasmine.js"),
        
        jsdoc: require("./build_tasks/jsdoc/jsdoc.js"),

        jshint: require("./build_tasks/jshint/jshint.js"),

        watch: require("./build_tasks/watch/watch.js")
            
    });
 
    grunt.registerTask("start", ["build", "watch"]);

    grunt.registerTask("build", ["transpile", "jshint", "uglify", "jasmine", "jsdoc"]);

    grunt.registerTask("default", ["start"]);
};