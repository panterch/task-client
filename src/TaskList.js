"use strict";

function TaskList(title) {
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
  var _markup = [ '<ul>' ];
  var _i;
  for (_i = 0; _i < this.tasks.length; _i += 1) {
    _markup.push(this.tasks[_i].render());
  }
  _markup.push('</ul>');
  return _markup.join('\n');
}

TaskList.load = function(id, callback) {
  $.getJSON('http://zhaw.task.li/task_lists/'+id, function(data) {
    console.log('xxxx');
    var _taskList = new TaskList()
    _taskList.title = data.title;
    var _i;
    for (_i = 0; _i < data.tasks.length; _i += 1) {
      var _task = new Task();
      _task = _taskList.createTask(data.tasks[_i].title);
      _task.done = data.tasks[_i].done;
    }
    callback(_taskList)
  });
}
