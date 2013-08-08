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
      expect(taskList.render()).toBe('ul');
      expect(taskList.render()).toBeEmpty();
    });
    it("renders tasks", function() {
      taskList.createTask('test task');
      expect(taskList.render().html()).toContain('test task');
    });
  });

});
