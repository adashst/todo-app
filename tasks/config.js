/* global module, require, process */
module.exports = function (grunt) {
    'use strict';
    // Task to adjust config options at runtime:
    grunt.registerTask('config', function (key, value) {
        grunt.config(key, value);
        grunt.log.writeln(
            'Set config option ' + key.cyan + ' to ' + value.cyan + '.'
        );
    });
    // Adjust default config options which cannot be set via JSON:
    var path = require('path'),
        locales = grunt.file.expand({
            cwd: grunt.config('options.localesBasepath'),
            filter: 'isDirectory'
        }, '*'),
        messageFormatRegExp = new RegExp(
            // /(de|en|fr)\.js$/
            '(' + locales.map(function (locale) {
                return locale.slice(0, 2);
            }).join('|') + ')\\.js$'
        ),
        angularLocaleFormat = function (locale) {
            return locale.toLowerCase().replace(/_/g, '\\-');
        },
        angularI18nRegExp = new RegExp(
            // /(de\-de|en\-us|fr\-fr)\.js$/
            '(' + angularLocaleFormat(locales.join('|')) + ')\\.js$'
        );
    grunt.config('options.locales', locales);
    grunt.config('locales.options.locales', locales);
    grunt.config('copy.messageformat.filter', function (file) {
        return messageFormatRegExp.test(file);
    });
    grunt.config('copy.angular-i18n.filter', function (file) {
        return angularI18nRegExp.test(file);
    });
    grunt.config('uglify.options.sourceMap', function (dest) {
        return dest + '.map';
    });
    grunt.config('uglify.options.sourceMappingURL', function (dest) {
        return path.basename(dest) + '.map';
    });
    grunt.config(
        'options.jQueryVersion',
        grunt.file.readJSON('bower_components/jquery/.bower.json').version
    );
    grunt.config(
        'options.angularVersion',
        grunt.file.readJSON('bower_components/angular/.bower.json').version
    );
    grunt.config('concat.production.options.process', {
        data: grunt.config.getRaw('options')
    });
    grunt.config('concat.locales.files', locales.map(function (locale) {
        var assetsBasepath = grunt.config('options.assetsBasepath'),
            localeBuildDest = grunt.config('locales.build.dest')
                .replace('{locale}', locale);
        return {
            'src': [
                localeBuildDest,
                assetsBasepath + 'js/lib/angular-i18n/angular-locale_' +
                    angularLocaleFormat(locale) + '.js'
            ],
            'dest': localeBuildDest.replace('.lib.js', '.js')
        };
    }));
    grunt.config('concat.locales.options.process', function (content, file) {
        if (file.indexOf('angular') !== -1) {
            // Replace the second (angular.module call),
            // fourth ($provide call) and last line and
            // ignore the first line, which introduces 'use strict' globally:
            var parts = content.split('\n').slice(1);
            parts[0] = '(function () {"use strict";\ni18n.ngLocale = i18n.ngLocale || {};';
            parts[2] = 'angular.extend(i18n.ngLocale, {';
            parts[parts.length - 1] = '}());\n';
            return parts.join('\n');
        }
        return content;
    });
    grunt.config('karma.unit.options.files', [
        grunt.config('options.assetsBasepath') + 'js/lib/jquery.js',
        grunt.config('options.assetsBasepath') + 'js/lib/angular.js'
    ].concat(grunt.config('uglify.app.src')).concat(
        grunt.config('karma.unit.options.files')
    ));
    grunt.config(
        'karma.coverage.options.files',
        grunt.config('karma.unit.options.files')
    );
    switch (process.platform) {
    case 'darwin':
        grunt.config(
            'karma.options.browsers',
            grunt.config('karma.options.browsers').concat('Safari')
        );
        break;
    case 'win32':
        grunt.config(
            'karma.options.browsers',
            grunt.config('karma.options.browsers').concat('IE')
        );
        break;
    }
};
