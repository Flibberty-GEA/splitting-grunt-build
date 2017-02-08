module.exports = {
    options: {
        shorthandCompacting: false,
        roundingPrecision: -1
    },
    target: {
        files: {
            '<%= dirs.build %>/<%= meta.artifact %>.min.css': ['<%= concat.vendor_css.dest %>']
        }
    }
};