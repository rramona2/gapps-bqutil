'use strict';

var gruntConfig = {
    jshint: {
        options: {
            jshintrc: '.jshintrc'
        },
        all: ['Gruntfile.js','index.js']
    }
};

module.exports = function(grunt) {
    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('build', ['jshint']);
};