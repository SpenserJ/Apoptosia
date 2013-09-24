ko.bindingHandlers.returnAction = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
          console.log('init');
    var value = ko.utils.unwrapObservable(valueAccessor());
    $(element).keydown(function(e) {
      if (e.which === 13) { value(viewModel); }
    });
  }
};
