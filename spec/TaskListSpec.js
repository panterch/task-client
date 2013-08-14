"use strict";

describe("TaskList", function() {
  var taskList;

  beforeEach(function() {
    localStorage.clear();
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

  describe("toJSON", function() {
    beforeEach(function() {
      taskList.createTask('first');
      taskList.createTask('second');
    });

    it('creates a task array', function() {
      expect(taskList.toJSON()).toContain('"tasks":[{');
    });

    it('includes the tasks titles', function() {
      expect(taskList.toJSON()).toContain('{"title":"first","done":false}');
      expect(taskList.toJSON()).toContain('{"title":"second","done":false}');
    });
  });

  describe("clear", function() {
    it("deletes everything in the localStorage", function() {

      // Mock clear function, to prevent page reload
      spyOn(taskList, "clear").andCallFake(function() {
        localStorage.clear();
      });

      taskList.createTask('first');
      taskList.createTask('second');

      taskList.save();
      taskList.clear();
      expect(localStorage.length).toEqual(0);
    });
  });

  describe("save", function() {
    beforeEach(function() {
      taskList.createTask('first');
      taskList.createTask('second');

      taskList.save();
    });

    spyOn(localStorage, "key").andReturn('_taskList');

    it("uses localstorage", function() {
      expect(localStorage.key(0)).toEqual('_taskList');
    });
  });

  describe("load", function() {
    beforeEach(function() {
      taskList.title = 'the list';
      taskList.createTask('first task');
      taskList.createTask('2nd task');

      taskList.save();
    });

    it("creates a tasklist via localStorage", function() {

      spyOn(localStorage, "getItem").andReturn('{"id":null,"title":"the list","tasks":[{"title":"first task","done":false},{"title":"2nd task","done":false}]}');

      var result;

      TaskList.load(function(taskList) {
        result = taskList;
      });

      // assertations
      expect(result.title).toEqual('the list');
      expect(result.tasks.length).toEqual(2);
      expect(result.tasks[0].title).toEqual('first task');
      expect(result.tasks[1].title).toEqual('2nd task');
    });
  });

  });
