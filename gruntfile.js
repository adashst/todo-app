/* global module */

module.exports = function (grunt) {
    'use strict';
    var config = {
        pkg: grunt.file.readJSON('package.json')
    };
    grunt.file.expand('config/*.json').forEach(function (file) {
        config[file.split(/\W/)[1]] = grunt.file.readJSON(file);
    });
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-locales');
    grunt.loadNpmTasks('grunt-bump-build-git');
    grunt.loadTasks('tasks');
    grunt.registerTask('default', grunt.config('default'));
};
