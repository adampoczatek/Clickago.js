module.exports = {
    dist: {
        files: {
            "<%= buildDest %>/<%= pkg.name %>.min.js": ["<%= srcDest %>/<%= pkg.name %>.js"]
        }
    }
};