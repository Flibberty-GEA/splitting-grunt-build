module.exports = {
    'default': [
        'dev'
    ],
    'dev': [
        'build',
        'compress'
    ],
    'build': [
        'clean',
        'gensourceslist',
        'jshint'
    ],
    'compress': [
        'concat:compile_js',
        'uglify',
        'concat:vendor_css',
        'hash'
    ],
    'watch': [
        'build',
        'delta'
    ]
};