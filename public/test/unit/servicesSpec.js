/*global describe, beforeEach, module, it, inject, expect */

(function () {
    'use strict';

    /* jasmine specs for services go here */

    describe('service', function () {
        beforeEach(module('myTodo.services',
            function ($provide) {
                $provide.value('version', '0.1');
            }
        ));

        describe('version', function () {
            it('should return current version', inject(function (version) {
                expect(version).toEqual('0.1');
            }));
        });
    });
}());
