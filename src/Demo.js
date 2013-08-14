"use strict";

$(function() {
  var taskList = new TaskList();
  taskList.createTask("Setup todo list");
  taskList.createTask("Buy milk");
  taskList.createTask("Read recipe");
  taskList.createTask("Invite guests");

  taskList.tasks[0].done = true;

  $('#createTask').click(function(event) {
    event.preventDefault();
    var task = taskList.createTask('');
    $('#taskList ul').append(task.render());
  });

  $('#taskList').html(taskList.render());

  $(':checkbox').on('change', function() {
  // Every code related goes in here
    if($(this).prop("checked")){
      $(this).prop("checked", true)
             .parent()
             .slideUp('slow', function() {
               $(this).addClass('finished')
                      .appendTo('ul')
                      .slideDown('slow')
             });
    } else {
      $(this).prop("checked", false)
             .parent()
             .slideUp('slow', function() {
               $(this).removeClass('finished')
                      .prependTo('ul')
                      .slideDown('slow')
             });
    }
  });

});
