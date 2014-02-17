/*global describe, beforeEach, module, it, inject, expect */

(function () {
    'use strict';

    /* jasmine specs for services go here */

    describe('service', function () {
        beforeEach(
            module('myTodo.services',
                function ($provide) {
                    $provide.value('version', '0.0.1');
                }
            )
        );

        describe('version', function () {
            it('should return current version', inject(function (version) {
                expect(version).toEqual('0.0.1');
            }));
        });

        describe('header', function () {
            it('should return the path to the header template', inject(function (header) {
                expect(header()).toEqual('/static/templates/header.html');
            }));
        });

        describe('footer', function () {
            it('should return the path to the footer template', inject(function (footer) {
                expect(footer()).toEqual('/static/templates/footer.html');
            }));
        });

    });
}());
