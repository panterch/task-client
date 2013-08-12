"use strict";

describe("Task", function() {
  var task;

  beforeEach(function() {
    task = new Task();
  });

  describe("basic object oriented features", function() {

    it("has a name property", function() {
      expect(task.title).toEqual("");
      task.title = 'test task';
      expect(task.title).toEqual('test task');
    });

    it("has a done property", function() {
      expect(task.done).toBeFalsy();
      task.done = true;
      expect(task.done).toEqual(true);
    });

    it("sets title via constructor" , function() {
      var task2 = new Task("title set");
      expect(task2.title).toEqual("title set");
    });

    it("distinguishes objects from each other", function() {
      var task2 = new Task('new');
      expect(task2.title).not.toEqual(task.title);
      expect(task2).not.toEqual(task);
    });

  });


  describe("render", function() {
    it("renders an unchecked checkbox", function() {
      var $markup = task.render();
      expect($markup.find('input[name=done]')).not.toBeChecked();
    });
    it("renders an empty input field", function() {
      var $markup = task.render();
      expect($markup.find('input[name=title]')).toHaveValue('')
    });
    it("checks the checkbox when done", function() {
      task.done = true;
      var $markup = task.render();
      expect($markup.find('input[name=done]')).toBeChecked();
    });
    it("renders an the title", function() {
      task.title = 'task title';
      var $markup = task.render();
      expect($markup.find('input[name=title]')).toHaveValue('task title');
    });
  });

  describe("syncs the model with its markup", function() {
    var $markup;
    beforeEach(function() {
      $markup = task.render();
    });
    it('adds itself as data to the markup', function() {
      expect($markup.data('task')).toEqual(task);
    });
    it('syncs the title value', function() {
      // change value of title input and fire an change event
      $markup.find('input[name=title]').val('changed title').change();
      expect(task.title).toEqual('changed title');
    });
    it('syncs the done value', function() {
      // change value of done checkbox and fire an change event
      $markup.find('input[name=done]').prop('checked', true).change();
      expect(task.done).toEqual(true);
    });
  });

});
