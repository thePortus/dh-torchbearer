(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhOptionAdd', dhOptionAdd);

  /*Directive Definition*/
  function dhOptionAdd() {
    var directive = {
      templateUrl: 'js/schema/optionadd.template.html',
      scope: {
        group: '=',
        schema: '='
      },
      controller: dhOptionAddController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhOptionAddController(Dialog, Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var optionGroups = vm.schema.optionGroups;
    var options = vm.schema.options(vm.group);

    /*Properties*/
    vm.options = options;
    vm.optionGroups = optionGroups;
    vm.addFlag=false;
    vm.newOption = {};

    /*Methods*/
   vm.create=create;
   
   /*Method Functions*/
   function create() {
      if (vm.newOption.label==='' || !vm.newOption.label) vm.newOption.label=vm.newOption.id;
      options.add(vm.newOption);
      Logger.log.option(vm.group, vm.newOption.id, 'add');
      vm.newOption = {};
      vm.addFlag = false;
      Toast.flash('New option added successfully');
    }
  }
  /*close dhOptionAddController*/

})();