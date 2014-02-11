/* global describe, beforeEach, module, it, inject, expect */

(function () {
    'use strict';

    describe('myTodo', function () {

        beforeEach(function () {
            module('myTodo');
        });

        it('Should define the routes', function () {
            inject(function ($route) {
                expect($route.routes['/todos']).toBeDefined();
                expect($route.routes['/undefined']).not.toBeDefined();
            });
        });
    });
}());
