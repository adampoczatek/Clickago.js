module.exports = {
    dist: {
        files: {
            "<%= buildDest %>/<%= pkg.name %>.min.js": ["<%= srcDest %>/<%= pkg.name %>.js"],
            "<%= buildDest %>/<%= pkg.name %>.commonjs.min.js": ["<%= tmpDest %>/<%= pkg.name %>.commonjs.js"],
            "<%= buildDest %>/<%= pkg.name %>.amd.min.js": ["<%= tmpDest %>/<%= pkg.name %>.amd.js"],
            "<%= buildDest %>/<%= pkg.name %>.globals.min.js": ["<%= tmpDest %>/<%= pkg.name %>.globals.js"]
        }
    }
};