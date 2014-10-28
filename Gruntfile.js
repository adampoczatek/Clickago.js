module.exports = function (grunt) {
    var matchdep;

    matchdep = require("matchdep");

    matchdep.filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    
    //grunt.loadNpmTasks('grunt-es6-module-transpiler');


    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        tmpDest: "./tmp",
        buildDest: "./dist",
        srcDest: "./src",
        srcFiles: [
            "./src/**/*.js"
        ],

        uglify: require("./build_tasks/uglify/uglify.js"),
        
        transpile: require("./build_tasks/transpile/transpile.js"),
        
        jsdoc: require("./build_tasks/jsdoc/jsdoc.js"),
        
        watch: require("./build_tasks/watch/watch.js")
        
    });
 
    grunt.registerTask("start", ["build", "watch"]);

    grunt.registerTask("build", ['transpile', "uglify", "jsdoc"]);

    grunt.registerTask("default", ["start"]);
};