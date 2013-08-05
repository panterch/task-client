"use strict";

function Task(title) {
  this.done = false;
  this.title = title || "";
}

Task.prototype.render = function() {
  var _checked = this.done ? 'checked="checked"' : "";
  var _title = this.title || "";
  return ['<li>',
   '  <input type="checkbox" '+_checked+'" />',
   '  <input type="text" value="'+_title+'" />',
   '</li>'].join("\n")
};

