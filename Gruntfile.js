module.exports = function (grunt) {
    var matchdep;

    matchdep = require("matchdep");

    matchdep.filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    
    //grunt.loadNpmTasks('grunt-es6-module-transpiler');


    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        buildDest: "./dist",
        srcDest: "./src",
        srcFiles: [
            "./src/**/*.js"
        ],

        uglify: require("./build_tasks/uglify/uglify.js"),
        transpile: {
            //main: {
            //    type: "amd",//"cjs", // or "amd" or "yui"
            //    files: [{
            //        expand: true,
            //        cwd: 'src/',
            //        src: ['**/*.ES6.js'],
            //        dest: 'tmp/'
            //    }]
            //}
                     toCJS: {
        type: "cjs",
        files: {
          'tmp/clickago.commonjs.js': ['src/clickago.ES6.js']
        },
      },
      toAMD: {
        type: "amd",
        files: {
          'tmp/clickago.amd.js': ['src/clickago.ES6.js']
        }
      },
      toYUI: {
        type: "yui",
        files: {
          'tmp/clickago.yui.js': ['src/clickago.ES6.js']
        }
      },
      toGlobals: {
        type: "globals",
        imports: { bar: "Clickago" },
        files: {
          'tmp/clickago.globals.js': ['src/clickago.ES6.js']
        }
      },
            
        },
        
        jsdoc: require("./build_tasks/jsdoc/jsdoc.js"),
        
        watch: require("./build_tasks/watch/watch.js")
        
    });
 
    grunt.registerTask("start", ["build", "watch"]);

    grunt.registerTask("build", ['transpile', "uglify", "jsdoc"]);

    grunt.registerTask("default", ["start"]);
};