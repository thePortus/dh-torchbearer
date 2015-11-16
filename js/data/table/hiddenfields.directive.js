(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTableHiddenFields', dhTableHiddenFields);

  /*Directive Definition*/
  function dhTableHiddenFields() {
    var directive = {
      templateUrl: 'js/data/table/hiddenfields.template.html',
      scope: {
        hiddenfields: '=',
        fields: '='
      },
      controller: dhTableHiddenFieldsController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableHiddenFieldsController() {
    /* jshint validthis: true */
    var vm = this;
    
    /*Properties*/
    vm.fieldInput = vm.hiddenfields;
    
    /*Methods*/
    vm.toggleField = toggleField;
    
    /*Functions*/
    function toggleField(fieldID) {
      if(!vm.hiddenfields[fieldID]) {
        delete vm.hiddenfields[fieldID];
      }
    }

  }
  /*close dhTableHiddenFieldsController*/
    
})();