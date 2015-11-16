(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTable', dhTable);

  /*Directive Definition*/
  function dhTable() {
    var directive = {
      templateUrl: 'js/data/table/table.template.html',
      scope: {
        tableid: '=',
        role: '=',
        data: '=',
        test: '=',
      },
      controller: dhTableController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableController() {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.searchterm = '';
    vm.selectedentry = '';
    vm.hiddenfields = {};
    vm.tabledata = new vm.data.table(vm.tableid);
    vm.options = vm.data.options;
    vm.optiongroups = vm.data.optionGroups();
    vm.fields = vm.data.fields(vm.tableid);

    /*Methods*/
    vm.checkForHidden = checkForHidden;

    /*Functions*/
    function checkForHidden() {
      var keys = Object.keys(vm.hiddenfields);
      if (keys.length > 0) return true;
      else return false;
    }
  }
  /*close dhTableController*/

})();
