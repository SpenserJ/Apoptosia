var tc;

(function () {
  var TCClient = function TCClient() {
    var self = this;
    console.log('TCClient()');

    self.modules = {};
  };

  TCClient.prototype.Ready = function Ready() {
    console.log('TCClient.Ready()');
    this.Events.trigger('ready');
  };

  TCClient.prototype.LoadModule = function LoadModule(module) {
    this.modules[module.name] = module;
    this[module.name] = new module();
    this[module.name].modules = [];
    this[module.name].LoadModule = this.LoadModule;
  };

  tc = new TCClient();
}());

window.onReady(function onReady() { tc.Ready(); });
