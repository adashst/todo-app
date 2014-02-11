/*global angular */

(function () {
    'use strict';

    /* Directives */
    angular.module('myTodo.directives', [
    ])
        .directive('appVersion', [
            'version',
            function (version) {
                return function (scope, elm) {
                    elm.text(version);
                };
            }
        ]);

}());
