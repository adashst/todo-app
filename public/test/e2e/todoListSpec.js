/* global describe, beforeEach, browser, it, expect, by, element */

(function () {
    'use strict';

    describe('todos list page', function () {

        var todoList;

        beforeEach(function () {
            browser.get('/');
            todoList = element.all(by.repeater('todo in todos'));
        });

        it('should load todos', function () {
            expect(browser.isElementPresent(
                by.id('todos')
            )).toBe(true);
        });

        it('should find element that is bound to model todos', function () {
            expect(browser.isElementPresent(
                by.model('newtodo')
            )).toBe(true);
        });

        it('should find reset button', function () {
            expect(browser.isElementPresent(
                by.className('reset')
            )).toBe(true);
        });

        it('should list todos', function () {
            expect(todoList.count()).toEqual(0);
        });

        it('should add a todo', function () {
            var addTodo = browser.element(by.model('newtodo')),
                addButton = browser.element(by.className('submit'));

            addTodo.sendKeys('write a protractor test');
            addButton.click();
            expect(todoList.count()).toEqual(1);
            expect(todoList.get(0).getText()).toEqual('write a protractor test');

            addTodo.sendKeys('go-to-lunch');
            addButton.click();
            expect(todoList.count()).toEqual(2);
            expect(todoList.get(1).getText()).toEqual('go-to-lunch');
        });

        it('should find detail link', function () {
            expect(browser.isElementPresent(
                by.className('preview')
            )).toBe(true);
        });

        it('should show the todo preview', function () {
            var detailButton = browser.element(by.className('preview'));
            detailButton.click();
            expect(browser.isElementPresent(by.className('trash'))).toBe(true);
        });

        it('should find remove link', function () {
            expect(browser.isElementPresent(
                by.className('trash')
            )).toBe(true);
        });

        it('should remove the first todo', function () {
            expect(todoList.count()).toEqual(2);
            todoList.first().then(function (li) {
                li.findElement(by.className('trash')).then(function (button) {
                    button.click();
                });
            });
            expect(todoList.count()).toEqual(1);
            expect(element(by.css('#todos ul li:nth-child(1) a.detail')).getText()).toEqual('go-to-lunch');
        });

        it('should navigate to the detail page when clicking', function () {
            element(by.css('#todos ul li:nth-child(1) a.detail')).click();
            expect(browser.getCurrentUrl()).toMatch(/\/todos\/go-to-lunch/);
        });

        it('should clear all todos', function () {
            expect(todoList.count()).toEqual(1);
            element(by.css('#todos button.reset')).click();
            expect(todoList.count()).toEqual(0);
            browser.element(by.model('newtodo')).sendKeys('go-home');
            browser.element(by.className('submit')).click();
        });

    });

}());
