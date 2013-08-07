"use strict";

describe("TaskList", function() {
  var taskList;

  beforeEach(function() {
    taskList = new TaskList();
  });

  it("adds a new element", function() {
    taskList.createTask('test');
    expect(taskList.tasks[0].title).toEqual('test');
  });

  describe("render", function() {
    it("renders empty list when empty", function() {
      expect(taskList.render()).toEqual('<ul>\n</ul>');
    });
    it("renders tasks", function() {
      taskList.createTask('test task');
      expect(taskList.render()).toContain('test task');
    });
  });

  describe("load", function() {

    it("creates a tasklist via ajax", function() {
      spyOn($, "getJSON").andCallFake(function(url, success) {
        console.log('xxx');
        success({ title: 'the list', tasks: []});
      });
      var result;
      TaskList.load('testlist', function(taskList) {
        result = taskList;

      });
      expect(result.title).toEqual('the list');
    });
  });

});
