/*global angular */

(function () {
    'use strict';

    /* Filters */
    angular.module('myTodo.filters', [])
        .filter('interpolate', ['version', function (version) {
            return function (text) {
                return String(text).replace(/\%VERSION\%/mg, version);
            };
        }]);
}());
