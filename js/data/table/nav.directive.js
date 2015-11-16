(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTableNav', dhTableNav);

  /*Directive Definition*/
  function dhTableNav() {
    var directive = {
      templateUrl: 'js/data/table/nav.template.html',
      scope: {
        tabledata: '='
      },
      controller: dhTableNavController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableNavController() {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.pageInput = vm.tabledata.pageCurrent() + 1;

    /*Methods*/
    vm.changePage = changePage;

    /*Method Functions*/
    function changePage(page) {
      var result = vm.tabledata.goToPage(page);
      if (result) vm.pageInput = page + 1;
    }

  }
  /*close dhTableNavController*/

})();
