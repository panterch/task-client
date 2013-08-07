"use strict";

function Task(title) {
  this.done = false;
  this.title = title || "";
}

Task.prototype.render = function() {
  var _checked = this.done ? 'checked="checked"' : "";
  var _title = this.title || "";
  var $markup = $(['<li>',
    '  <input name="done"  type="checkbox" '+_checked+'" />',
    '  <input name="title" type="text" value="'+_title+'" />',
    '</li>'].join(" "))
  $markup.data('task', this);
  $markup.find('input').change(function(event) {
    var $li = $(this).parent('li')
    var _task = $li.data('task');
    _task.done = $li.find('input[name=done]').is(':checked');
    _task.title = $li.find('input[name=title]').val();
  });
  return $markup;
};

