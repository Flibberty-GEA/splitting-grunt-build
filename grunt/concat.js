module.exports = {

    /**
     * The `vendor_css` target concatenates vendor CSS.
     */
    vendor_css: {
        src: ['<%= vendor_files.css %>'],
        dest: '<%= dirs.build %>/vendor_styles.css'
    },
    /**
     * The `build_css` target concatenates compiled CSS and vendor CSS
     * together.
     */
    build_css: {
        src: [
            '<%= dirs.build %>/app_styles.min.css',
            '<%= dirs.build %>/vendor_styles.css'
        ],
        dest: '<%= dirs.build %>/<%= meta.artifact %>.min.css'
    },
    /**
     * The `compile_js` target is the concatenation of our application source
     * code and all specified vendor source code into a single file.
     */
    compile_js: {
        options: {
            separator: ';\n'
        },
        src: [
            '<%= vendor_files.js %>',
            '<%= app_files.js %>'
        ],
        dest: "<%= dirs.build %>/<%= meta.artifact %>.js"
    }
};