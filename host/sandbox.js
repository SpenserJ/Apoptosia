var vm = require('vm')
  , fs = require('fs');

var Sandbox = function Sandbox(scope) {
  this.scope = scope;
  this.script = null;
};

Sandbox.prototype.executeFile = function executeFile(filename, callback) {
  var self = this;
  if (!filename) { throw 'Sandbox.executeFile missing first argument (filename)'; }

  fs.readFile(filename, { encoding: 'utf8' }, function (err, source) {
    if (err) {
      return console.log('Encountered error when loading sandbox file:', err);
    }
    self.executeScript(source, callback);
  });
};

Sandbox.prototype.executeScript = function executeScript(source, callback) {
  if (!source) { throw 'Sandbox.executeScript missing first argument (source)'; }

  source = '"use strict";' + source;
  try {
    this.script = vm.runInNewContext(source, this.scope);
  }
  catch (err) {
    console.log('Server Sandbox threw error:', err);
  }
  if (typeof callback === 'function') {
    callback();
  }
};

module.exports = Sandbox;
