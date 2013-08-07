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
      // mock the ajax call to the server loading the tasklist
      spyOn($, "getJSON").andCallFake(function(url, callback) {
        callback({ title: 'the list',
          tasks: [
            { title: 'first task', done: true },
            { title: '2nd task', done: false },
          ]});
      });

      // execute a mocked ajax call and populate tasklist into result
      var result;
      TaskList.load('testlist', function(taskList) {
        result = taskList;
      });

      // assertations
      expect(result.title).toEqual('the list');
      expect(result.tasks.length).toEqual(2);
      expect(result.tasks[0].title).toEqual('first task');
      expect(result.tasks[0].done).toBe(true);
      expect(result.tasks[1].title).toEqual('2nd task');
      expect(result.tasks[1].done).toBe(false);
    });
  });

});
