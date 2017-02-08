module.exports = {
    sources_js: {
        options: {
            srcBasePath: '<%= dirs.src %>',
            destBasePath: ''
        },
        files: [
            {
                src: [
                    '<%= app_files.js %>'
                ],
                dest: '<%= dirs.resources %>/source_scripts.txt'
            }
        ]
    },

    sources_globbing_js: {
        options: {
            srcBasePath: '<%= dirs.src %>',
            destBasePath: ''
        },
        files: [
            {
                src: [
                    '<%= app_files_globbing.js %>'
                ],
                dest: '<%= dirs.resources %>/source_globbing_scripts.txt'
            }
        ]
    },

    sources_css: {
        options: {
            srcBasePath: '<%= dirs.src %>'
        },
        files: [
            {
                src: ['<%= app_files.css %>'],
                dest: '<%= dirs.resources %>/source_styles.txt'
            }
        ]
    },
    sources_globbing_css: {
        options: {
            srcBasePath: '<%= dirs.src %>'
        },
        files: [
            {
                src: ['<%= app_files_globbing.css %>'],
                dest: '<%= dirs.resources %>/source_globbing_styles.txt'
            }
        ]
    },

    vendor_js: {
        options: {
            srcBasePath: '<%= dirs.src %>'
        },
        files: [
            {
                src: '<%= vendor_files.js %>',
                dest: '<%= dirs.resources %>/vendor_scripts.txt'
            }

        ]
    },

    vendor_css: {
        options: {
            srcBasePath: '<%= dirs.src %>'
        },
        files: [
            {
                src: '<%= vendor_files.css %>',
                dest: '<%= dirs.resources %>/vendor_styles.txt'
            }

        ]
    }
};
