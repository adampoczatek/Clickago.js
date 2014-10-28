module.exports = {
    dist: {
        options: {
            sourceMap: true
        },
        files: {
            "<%= buildDest %>/<%= pkg.name %>.commonjs.min.js": ["<%= buildDest %>/<%= pkg.name %>.commonjs.js"],
            "<%= buildDest %>/<%= pkg.name %>.amd.min.js": ["<%= buildDest %>/<%= pkg.name %>.amd.js"],
            "<%= buildDest %>/<%= pkg.name %>.min.js": ["<%= buildDest %>/<%= pkg.name %>.js"]
        }
    }
};