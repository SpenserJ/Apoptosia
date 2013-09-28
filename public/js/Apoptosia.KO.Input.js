ko.bindingHandlers.APInputSupport = {
  init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    $(element).focus(function () { ap.Input.ignoreEvents = true; })
              .blur (function () { ap.Input.ignoreEvents = false; });
  }
};
