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
        connect: require("./build_tasks/connect/connect.js"),
        jsdoc: require("./build_tasks/jsdoc/jsdoc.js"),
        watch: require("./build_tasks/watch/watch.js")
    });

    grunt.registerTask("start", ["build", "connect", "watch"]);

    grunt.registerTask("build", ["uglify", "jsdoc"]);

    grunt.registerTask("default", ["start"]);
};