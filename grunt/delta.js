module.exports = {
    /**
     * By default, we want the Live Reload to work for all tasks; this is
     * overridden in some tasks (like this file) where browser resources are
     * unaffected. It runs by default on port 35729, which your browser
     * plugin should auto-detect.
     */
    options: {
        livereload: true
    },

    /**
     * When the Gruntfile changes, we just want to lint it.
     */
    gruntfile: {
        files: 'gruntfile.js',
        tasks: ['jshint:gruntfile']
    },

    /**
     * When our JavaScript source files change, we want to lint them,
     * run our unit tests, and live reload.
     */
    jssrc: {
        files: [
            '<%= app_files.js %>'
        ],
        tasks: ['jshint:src']
    },
    pkg: {
        files: 'package.json',
        tasks: ['build']
    }
};