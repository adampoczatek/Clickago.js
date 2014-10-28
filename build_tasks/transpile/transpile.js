module.exports = {
    toCJS: {
        type: "cjs",
        files: {
            "<%= buildDest %>/<%= pkg.name %>.commonjs.js": ["<%= srcDest %>/<%= pkg.name %>.ES6.js"]
        },
    },
    toAMD: {
        type: "amd",
        files: {
            "<%= buildDest %>/<%= pkg.name %>.amd.js": ["<%= srcDest %>/<%= pkg.name %>.ES6.js"]
        }
    },
    toGlobals: {
        type: "globals",
        imports: { bar: "Clickago" },
        files: {
            "<%= buildDest %>/<%= pkg.name %>.js": ["<%= srcDest %>/<%= pkg.name %>.ES6.js"]
        }
    }
};