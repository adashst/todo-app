/* global describe, beforeEach, browser, it, expect, by, element */

(function () {
    'use strict';

    describe('todo detail page', function () {

        beforeEach(function () {
            browser.get('/#/todos/go-home');
        });

        it('should load todo', function () {
            expect(browser.isElementPresent(
                by.id('todo')
            )).toBe(true);
        });

        it('should show the todo details', function () {
            expect(element(by.css('#todo div.well h2')).getText()).toEqual('go-home');
        });

        it('should navigate to the list', function () {
            element(by.css('#todo a')).click();
            expect(browser.getCurrentUrl()).toMatch(/\/todos/);
        });
    });

}());
