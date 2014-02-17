/*global angular */

(function () {
    'use strict';

    angular.module('myTodo.services', [])
        
        .value('version', '0.0.2')
        
        .factory('header', function () {
            var header = function () {
                return '/static/templates/header.html';
            };
            return header;
        })

        .factory('footer', function () {
            var footer = function () {
                return '/static/templates/footer.html';
            };
            return footer;
        });

}());
