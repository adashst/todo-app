/*global describe, module, beforeEach, it, expect, inject, angular */

(function () {
    'use strict';

    describe('controllers', function () {

        beforeEach(function () {
            module('myTodo.controllers');
        });

        var scope;

        beforeEach(inject(
            function ($injector, $rootScope) {
                scope = $rootScope.$new();
            }
        ));

        describe('frameController', function () {
            it('should define today date', inject(
                function ($controller) {
                    $controller('frameCtrl', {
                        $scope: scope
                    });
                    expect(scope.today).toBeDefined();
                }
            ));
        });

        describe('todoController', function () {

            beforeEach(inject(
                function ($controller) {
                    $controller('todoListCtrl', {
                        $scope: scope
                    });
                    scope.todos = [];
                }
            ));

            it('should define a todos array', inject(
                function () {
                    expect(scope.todos).toBeDefined();
                }
            ));

            it('should define an empty todos array', inject(
                function ($window) {
                    $window.localStorage.clear();
                    expect(scope.todos.length).toEqual(0);
                }
            ));

            it('should define an addTodo method', function () {
                expect(scope.addTodo).toBeDefined();
            });

            it('should add todo if a title for the new todo was defined', function () {
                scope.newtodo = 'task1';
                scope.addTodo();
                expect(scope.todos[0].key).toEqual('task1');
                expect(scope.todos[0].createDate).toBeDefined();
                expect(scope.newtodo).toEqual('');
            });

            it('should not add todo if newtodo title is empty', function () {
                expect(scope.todos.length).toEqual(0);
                scope.newtodo = '';
                scope.addTodo();
                expect(scope.todos.length).toEqual(0);
                scope.newtodo = undefined;
                scope.addTodo();
                expect(scope.todos.length).toEqual(0);
            });

            it('should define a doneTodo method', function () {
                expect(scope.doneTodo).toBeDefined();
            });

            it('should set todo status to "done"', function () {
                scope.todos = [{key: 'task1', status: 'undone'}];
                scope.doneTodo('task1');
                expect(scope.todos[0].status).toEqual('done');
            });

            it('should not set todo status if given todo is not found', function () {
                scope.todos = [{key: 'task1', status: 'undone'}];
                scope.doneTodo('undefined');
                expect(scope.todos[0].status).toEqual('undone');
            });

            it('should define a removeTodo method', function () {
                expect(scope.removeTodo).toBeDefined();
            });

            it('should remove todo', function () {
                scope.todos = [{key: 'task1', status: 'undone'}, {key: 'task2', status: 'undone'}];
                scope.removeTodo('task1');
                expect(scope.todos.length).toEqual(1);
            });

            it('should not remove todo if given todo is not found', function () {
                scope.todos = [{key: 'task1', status: 'undone'}];
                scope.removeTodo('undefined');
                expect(scope.todos[0].key).toEqual('task1');
            });

            it('should define a clearStorage method', function () {
                expect(scope.clearStorage).toBeDefined();
            });

            it('should clear the windows storage', inject(
                function ($window) {
                    var w = $window,
                        toDoListId = 'todos',
                        todos;
                    scope.newtodo = 'task1';
                    scope.addTodo();
                    todos = angular.fromJson(w.localStorage[toDoListId]);
                    expect(todos[0].key).toEqual('task1');
                    scope.clearStorage();
                    expect(angular.fromJson(w.localStorage)).toEqual({});
                }
            ));

        });

        describe('todoDetailCtrl', function () {

            var toDoListId = 'todos';

            it('should load the todo if given key is found', inject(
                function ($controller, $window) {
                    scope.todos = [{key: 'task2', status: 'undone', createDate: '2014-02-14'}];
                    $window.localStorage.setItem(toDoListId, angular.toJson(scope.todos));
                    $controller('todoDetailCtrl', {
                            $scope: scope,
                            $routeParams: {todoId: 'task2'}
                        });
                    expect(scope.todo.key).toEqual('task2');
                    expect(scope.todo.createDate).toEqual('2014-02-14');
                }
            ));

            it('should redirect to list view if no todo was defined yet', inject(
                function ($controller, $location, $window) {
                    $location.path('/todos/task1');
                    expect($location.path()).toEqual('/todos/task1');
                    $window.localStorage.clear();
                    $controller('todoDetailCtrl', {
                            $scope: scope,
                            $routeParams: {todoId: ''}
                        });
                    expect($location.path()).toEqual('/todos');
                }
            ));

            it('should redirect to list view if no key is given', inject(
                function ($controller, $location) {
                    $location.path('/todos/task1');
                    expect($location.path()).toEqual('/todos/task1');
                    $controller('todoDetailCtrl', {
                            $scope: scope,
                            $routeParams: {todoId: ''}
                        });
                    scope.todos = [{key: 'task1', status: 'undone'}];
                    expect($location.path()).toEqual('/todos');
                }
            ));

            it('should redirect to list view if given key is not found', inject(
                function ($controller, $location, $window) {
                    scope.todos = [{key: 'task2', status: 'undone'}];
                    $window.localStorage.setItem(toDoListId, angular.toJson(scope.todos));
                    $location.path('/todos/task1');
                    expect($location.path()).toEqual('/todos/task1');
                    $controller('todoDetailCtrl', {
                            $scope: scope,
                            $routeParams: {todoId: 'task1'}
                        });
                    expect($location.path()).toEqual('/todos');
                }
            ));
        });
    });
}());
