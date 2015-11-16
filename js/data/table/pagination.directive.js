(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTablePagination', dhTablePagination);

  /*Directive Definition*/
  function dhTablePagination() {
    var directive = {
      templateUrl: 'js/data/table/pagination.template.html',
      scope: {
        tabledata: '='
      },
      controller: dhTablePaginationController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTablePaginationController() {
    /* jshint validthis: true */
    var vm = this;
    
    /*Properties*/
    vm.numResults = 10;
    vm.options = [10,15,25,50];
    
  }
  /*close dhTableNavController*/
    
})();