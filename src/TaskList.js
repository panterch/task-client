"use strict";

function TaskList(title) {
  this.id = null;
  this.tasks = [];
  this.title = title || "";
}

TaskList.prototype.size = function() {
  return this.tasks.length;
};

TaskList.prototype.createTask = function(title) {
  var _task = new Task(title);
  this.tasks.push(_task);
  return _task;
};


TaskList.prototype.render = function() {
  var $markup = $('<ul>');
  var _i;
  for (_i = 0; _i < this.tasks.length; _i += 1) {
    $markup.append(this.tasks[_i].render());
  }
  return $markup;
}

TaskList.prototype.toJSON = function() {
  var _hash = { id: this.id, title: this.title, tasks: [] }
  var _i;
  for (_i = 0; _i < this.tasks.length; _i += 1) {
    _hash.tasks.push({
      title: this.tasks[_i].title,
      done:  this.tasks[_i].done
    });
  }
  return JSON.stringify(_hash);
}

/*
 * deletes everything in the localStorage and reload page
 */
TaskList.prototype.clear = function() {
  localStorage.clear();
  location.reload();
}

/*
 * persists the tasklist to the localStorage
 */
TaskList.prototype.save = function() {
  localStorage.setItem("_taskList", this.toJSON())
}

/*
 * Loads the given tasklist from the localStorage.
 *
 * @param {function} callback - method to call after the tasklist
 *   was successfully loaded. receives fully populated tasklist
 *   object as first and only parameter.
 */
TaskList.load = function(callback) {
  var _taskList = new TaskList();
  var data = $.parseJSON(localStorage.getItem("_taskList"));
  _taskList.id = data.id;
  _taskList.title = data.title;
  var _i;
  for (_i = 0; _i < data.tasks.length; _i += 1) {
    var _task = new Task();
    _task = _taskList.createTask(data.tasks[_i].title);
    _task.done = data.tasks[_i].done;
  }
  callback(_taskList)
}
