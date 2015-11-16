(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTableColumnHeader', dhTableColumnHeader);

  /*Directive Definition*/
  function dhTableColumnHeader() {
    var directive = {
      templateUrl: 'js/data/table/view/columnheader.template.html',
      scope: {
        field: '=',
        sorting: '=',
        hiddenfields: '='
      },
      controller: dhTableColumnHeaderController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableColumnHeaderController() {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/

    /*Methods*/
    vm.sort = sort;
    vm.toggle = toggle;

    function toggle(fieldID) {
      vm.hiddenfields[fieldID] = !vm.hiddenfields[fieldID];
    }

    /*Toggles the sort field and direction. If switching to a new field,
    the reverse flag is false, a field is already selected, then the
    reverse flag is set true. If a field is already reverse, it switches
    to unsorted*/
    function sort(fieldID) {
      if (!vm.sorting.field) vm.sorting = {
        field: fieldID,
        reverse: false
      };
      else if (vm.sorting.field != fieldID) vm.sorting = {
        field: fieldID,
        reverse: false
      };
      else if (vm.sorting.field == fieldID && vm.sorting.reverse === false) vm.sorting = {
        field: fieldID,
        reverse: true
      };

      else if (vm.sorting.field == fieldID && vm.sorting.reverse === true) vm.sorting = {
        field: null,
        reverse: null
      };
    }

  }
  /*close dhTableColumnHeaderController*/

})();