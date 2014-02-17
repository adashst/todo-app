/*global angular */

(function () {
    'use strict';

    angular.module('myTodo.controllers', [])

        .controller('appCtrl', ['$rootScope', 'header', 'footer',
            function ($rootScope, header, footer) {
                $rootScope.header = header;
                $rootScope.footer = footer;
            }
        ])

        .controller('headerCtrl', [function () {
            angular.noop();
        }])

        .controller('footerCtrl', ['$scope', function ($scope) {
            $scope.today = Date();
        }])

        .controller('todoListCtrl', [
            '$scope', '$location', '$window',
            function ($scope, $location, $window) {
                var w = $window,
                    toDoListId = 'todos',
                    setStorage = function () {
                        w.localStorage.setItem(toDoListId, angular.toJson($scope.todos));
                    };
                $scope.todos = angular.fromJson(w.localStorage.getItem(toDoListId)) || [];

                $scope.addTodo = function () {
                    if (!!$scope.newtodo) {
                        $scope.todos.push({
                            key: $scope.newtodo,
                            status: 'undone',
                            createDate: Date()
                        });
                        $scope.newtodo = '';
                        setStorage();
                    }
                };

                $scope.doneTodo = function (name) {
                    var i;
                    for (i = 0; i < $scope.todos.length; i += 1) {
                        if ($scope.todos[i].key === name) {
                            $scope.todos[i].status = 'done';
                        }
                    }
                    setStorage();
                };

                $scope.removeTodo = function (name) {
                    var i;
                    for (i = 0; i < $scope.todos.length; i += 1) {
                        if ($scope.todos[i].key === name) {
                            $scope.todos.splice(i, 1);
                        }
                    }
                    setStorage();
                };

                $scope.clearStorage = function () {
                    w.localStorage.clear();
                    $scope.todos = [];
                };
            }

        ])

        .controller('todoDetailCtrl', [
            '$scope', '$routeParams', '$window', '$location',
            function ($scope, $routeParams, $window, $location) {
                var z,
                    found,
                    w = $window,
                    toDoListId = 'todos',
                    redirect = function () {
                        $location.path('/todos');
                    };
                if (!$routeParams.todoId) {
                    redirect();
                }
                $scope.todos = angular.fromJson(w.localStorage.getItem(toDoListId)) || [];
                $scope.todo = {};
                z = $scope.todos.length;
                while (z--) {
                    if ($scope.todos[z].key === $routeParams.todoId) {
                        $scope.todo = $scope.todos[z];
                        found = true;
                    }
                }
                if (!found) {
                    redirect();
                }
            }
        ]);

}());
