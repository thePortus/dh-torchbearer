(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhData', dhData);

  /*Directive Definition*/
  function dhData() {
    var directive = {
      templateUrl: 'js/data/data.template.html',
      scope: {
        ref: '=',
        role: '=',
      },
      controller: dhDataController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhDataController(Data) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.data = new Data(vm.ref, vm.role);
    vm.tableList = vm.data.tableList();

  }
  /*close dhDataController*/

})();