(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhGroupAdd', dhGroupAdd);

  /*Directive Definition*/
  function dhGroupAdd() {
    var directive = {
      templateUrl: 'js/schema/groupadd.template.html',
      scope: {
        schema: '='
      },
      controller: dhGroupAddController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhGroupAddController(Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var groups = vm.schema.optionGroups;
    
    /*Properties*/
    vm.addFlag = false;
    vm.groups = groups;
    vm.newGroup = {};

    /*Methods*/
    vm.create = create;

    /*Functions*/
    function create() {
      if (vm.newGroup.label === '' || !vm.newGroup.label) vm.groups.label = vm.groups.id;
      groups.add(vm.newGroup);
      Logger.log.optionGroup(vm.newGroup.id, 'add');
      vm.newGroup = {};
      vm.addFlag = false;
      Toast.flash('Option group added successfully');
    }

  }
  /*close dhGroupAddController*/

})();