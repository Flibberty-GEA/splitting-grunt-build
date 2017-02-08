module.exports = {
        options: {
            banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
            src: "<%= concat.compile_js.dest %>",
            dest: "<%= dirs.build %>/<%= meta.artifact %>.min.js"
        }
};