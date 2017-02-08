module.exports = function (grunt) {
    "use strict";

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js');
    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            artifact: "<%= pkg.name %>-<%= pkg.version %>"
        },

        jshint: {
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
        },

        concat: {
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
                /*options: {
                 separator: ';'
                 },*/
                src: [
                    '<%= vendor_files.js %>',
                    '<%= app_files.js %>'
                ],
                dest: "<%= dirs.build %>/<%= meta.artifact %>.js"
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: "<%= concat.compile_js.dest %>",
                dest: "<%= dirs.build %>/<%= meta.artifact %>.min.js"
            }
        },

        // cssmin: {
        //     payment_widget: {
        //         files: {
        //             '<%= dirs.payment_widget %>/css/payment-widget_embed.css':
        //                 '<%= dirs.payment_widget %>/target/payment-widget.css'
        //         }
        //     }
        // },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '<%= dirs.build %>/<%= meta.artifact %>.min.css': ['<%= concat.vendor_css.dest %>']
                }
            }
        },

        requirejs: {
            payment_widget: {
                options: {
                    baseUrl: '<%= dirs.payment_widget %>',
                    name: 'bower_components/almond/almond',
                    include: ['embed'],
                    mainConfigFile: '<%= dirs.payment_widget %>/config.js',
                    out: '<%= dirs.payment_widget %>/embed.min.js'
                }
            }
        },

        hash: {
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
        },

        /**
         * Creates file(one for js, one for css) that contains a list of URLs to js and css files
         *
         * Upon these files Liftweb builds a list of <script> tags in dev mode,
         * or uses minimized versions for prod mode.
         */
        gensourceslist: {

            sources_js: {
                options: {
                    srcBasePath: '<%= dirs.src %>', // the base Path you want to remove from the input
                    destBasePath: '' // the base Path you want to prepend to output
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
                    srcBasePath: '<%= dirs.src %>', // the base Path you want to remove from the input
                    destBasePath: '' // the base Path you want to prepend to output
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
        },

        copy: {
            vendor_assets: {
                files: [
                    {
                        src: ['<%= vendor_files.assets %>'],
                        dest: '<%= dirs.dist %>/',
                        cwd: '<%= dirs.src %>',
                        expand: true
                    }
                ]
            }
        },

        delta: {
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
        },
        clean: {
            build: ["<%= dirs.target %>"],
        }
    };

    // configure grunt
    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build', ['clean', 'gensourceslist', 'jshint']);


    /**
     * The `compress` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask('compress', [
        'concat:compile_js', 'uglify', 'concat:vendor_css', /*'concat:build_css', */'hash', 'copy:vendor_assets'
    ]);

    /**
     * The default task is to build, test, and compress.
     */
    grunt.registerTask('default', ['build', 'compress']);

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);

    grunt.registerMultiTask('gensourceslist', 'Generate a list of sources.', function () {
        this.files.forEach(function (fs) {
            grunt.log.writeln('File "' + fs.src + '" created.');
            var contents = "";
                    fs.src.forEach(function (filepathh) {
                        contents = contents + filepathh + "\n";
                    });
            grunt.file.write(fs.dest, contents);
            grunt.log.writeln("File created: " + fs.dest);
        });

    });

};




// grunt.registerMultiTask('gensourceslist', 'Generate a list of sources.', function () {
//     var options = this.options(),
//         destBasePath = options.destBasePath || '';
//
//     this.files.forEach(function (fs) {
//         var contents = "";
//         fs.orig.src.forEach(function (file) {
//             var out = destBasePath + file.replace(options.srcBasePath, "");
//             contents = contents + out + "\n";
//         });
//
//         grunt.file.write(fs.dest, contents);
//         grunt.log.writeln("File created: " + fs.dest);
//     });
// });

