/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

    dirs: {
        src: "src",
        vendor: "src/bower_components",
        target: "target/grunt",
        dist: "<%= dirs.target %>/dist",
        build: "<%= dirs.target %>/build",
        resources: "<%= dirs.target %>/resources"
    },

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/main/webapp/app`). These file paths are used in the configuration of
     * build tasks. `js` is all project angular javascript, less tests. `jsjq` is
     * jquery javascript. `tpl` contains our app's template HTML files, `less`
     * is our main stylesheet, and `jsspec` contains our app's tests.
     */
    app_files: {
        js: [
            "<%= dirs.src %>/js/main.js",
            "<%= dirs.src %>/partials/js/app.js",
            "<%= dirs.src %>/partials/js/button.js"
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`components/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: [
            "<%= dirs.vendor %>/jquery/dist/jquery.js"
        ],
        css: [
            "<%= dirs.vendor %>/normalize.css/normalize.css"
        ],
        assets: [

        ]
    }
};
