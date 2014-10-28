module.exports = {
    toCJS: {
        type: "cjs",
        files: {
            "<%= tmpDest %>/<%= pkg.name %>.commonjs.js": ["<%= srcDest %>/<%= pkg.name %>.ES6.js"]
        },
    },
    toAMD: {
        type: "amd",
        files: {
            "<%= tmpDest %>/<%= pkg.name %>.amd.js": ["<%= srcDest %>/<%= pkg.name %>.ES6.js"]
        }
    },
    toGlobals: {
        type: "globals",
        imports: { bar: "Clickago" },
        files: {
            "<%= tmpDest %>/<%= pkg.name %>.globals.js": ["<%= srcDest %>/<%= pkg.name %>.ES6.js"]
        }
    }
};