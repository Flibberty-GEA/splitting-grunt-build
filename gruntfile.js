module.exports = function (grunt) {
    "use strict";

    require('time-grunt')(grunt);

    var taskConfig = require('load-grunt-config')(grunt, {
        data: {
            pkg: grunt.file.readJSON('package.json'),
            meta: {
                artifact: "<%= pkg.name %>-<%= pkg.version %>"
            }
        },
        jitGrunt: true
    });


    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js');

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */



    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


    grunt.registerMultiTask('gensourceslist', 'Generate a list of sources.', function () {
        var options = this.options(),
            destBasePath = options.destBasePath || '';

        this.files.forEach(function (fs) {
            var contents = "";
            fs.src.forEach(function (file) {
                var out = destBasePath + file.replace(options.srcBasePath, "");
                contents = contents + out + "\n";
            });

            grunt.file.write(fs.dest, contents);
            grunt.log.writeln("File created: " + fs.dest);
        });
    });


    // grunt.registerMultiTask('gensourceslist', 'Generate a list of sources.', function () {
    //     this.files.forEach(function (fs) {
    //         grunt.log.writeln('File "' + fs.src + '" created.');
    //         var contents = "";
    //                 fs.src.forEach(function (filepathh) {
    //                     contents = contents + filepathh + "\n";
    //                 });
    //         grunt.file.write(fs.dest, contents);
    //         grunt.log.writeln("File created: " + fs.dest);
    //     });
    //
    // });
};






