module.exports = {
    options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        browser: true,
        evil: true,
        globals: {
            "jQuery": true,
            "$": false,
            "angular": false,
            "_": false,
            "ko": false,
            "App": true
        }
    },
    src: [
        '<%= app_files.js %>'
    ],
    gruntfile: {
        options: {
            globals: {
                "module": false,
                "require": false
            }
        },
        files: {
            src: ['gruntfile.js']
        }
    }
};