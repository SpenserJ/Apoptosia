var ap;

(function () {
  var ApoptosiaClient = function ApoptosiaClient() {
    var self = this;
    console.log('ApoptosiaClient()');

    self.modules = {};
  };

  ApoptosiaClient.prototype.Ready = function Ready() {
    console.log('ApoptosiaClient.Ready()');
    this.Events.trigger('ready');
  };

  ApoptosiaClient.prototype.LoadModule = function LoadModule(module) {
    this.modules[module.name] = module;
    this[module.name] = new module();
    this[module.name].modules = [];
    this[module.name].LoadModule = this.LoadModule;
  };

  ap = new ApoptosiaClient();
}());

window.onReady(function onReady() { ap.Ready(); });
