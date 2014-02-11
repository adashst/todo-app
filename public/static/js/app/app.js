/* global window */

(function ($, angular) {
    'use strict';

    angular.module('myTodo', [
        'ngRoute',
        'myTodo.filters',
        'myTodo.services',
        'myTodo.directives',
        'myTodo.controllers'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/error', {templateUrl: 'static/templates/error.html', controller: 'errorCtrl'})
                .when('/todos', {templateUrl: 'static/templates/todo-list.html', controller: 'todoListCtrl'})
                .when('/todos/:todoId', {templateUrl: 'static/templates/todo-detail.html', controller: 'todoDetailCtrl'})
                .otherwise({redirectTo: '/todos'});
        }
    ]);

}(window.jQuery, window.angular));
