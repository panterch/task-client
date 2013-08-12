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
  // TODO add task model as html data attribute under key 'task'
  // TODO sync model data after text was inserted or done was checked
  return $markup;
};

