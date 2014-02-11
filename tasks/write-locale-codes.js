/* global module */
module.exports = function (grunt) {
    'use strict';
    grunt.registerTask('write-locale-codes', function () {
        var localeCodesFile = grunt.config('options.localesBasepath') +
                'locale-codes.json',
            localeCodesFileExists = grunt.file.exists(localeCodesFile),
            localeCodes = {},
            jsonSpace = grunt.config('options.jsonSpace');
        grunt.config('options.locales').forEach(function (locale) {
            localeCodes[locale] = locale;
        });
        grunt.file.write(
            localeCodesFile,
            JSON.stringify(
                localeCodes,
                grunt.config('options.jsonReplacer'),
                jsonSpace === undefined ? 2 : jsonSpace
            ) + '\n'
        );
        grunt.log.writeln(
            (localeCodesFileExists ? 'Updated' : 'Created') +
                ' ' + localeCodesFile.cyan + '.'
        );
    });
};
