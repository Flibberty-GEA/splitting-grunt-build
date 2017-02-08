module.exports = {
    options: {
        mapping: '<%= dirs.resources %>/assets.json',
        srcBasePath: '<%= dirs.build %>',
        destBasePath: '<%= dirs.dist %>/assets'
    },
    js: {
        src: '<%= uglify.build.dest %>',
        dest: '<%= dirs.dist %>/assets'
    },
    css: {
        src: '<%= dirs.build %>/<%= meta.artifact %>.min.css',
        dest: '<%= dirs.dist %>/assets'
    }
};