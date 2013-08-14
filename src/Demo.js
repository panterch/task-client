"use strict";

var taskList;

$(function() {

  if (localStorage.getItem("_taskList") !== null) {
    TaskList.load(function(tl) {
      taskList = tl;
      $('#taskList').html(taskList.render());
    });
  } else {
    taskList = new TaskList();
    taskList.createTask('');
    $('#taskList').html(taskList.render());
  }

  $('#createTask').click(function(event) {
    event.preventDefault();
    var task = taskList.createTask('');
    $('#taskList ul').append(task.render());
  });

  $('#clearTasks').click(function(event) {
    taskList.clear();
  });

  $('#saveTasks').click(function(event) {
    taskList.save();
  });

});
