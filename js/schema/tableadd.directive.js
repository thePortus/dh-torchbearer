(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhTableAdd', dhTableAdd);

  /*Directive Definition*/
  function dhTableAdd() {
    var directive = {
      templateUrl: 'js/schema/tableadd.template.html',
      scope: {
        schema: '='
      },
      controller: dhTableAddController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableAddController(Dialog, Toast, Schema, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var tables = vm.schema.tables;
    
    /*Properties*/
    vm.tables = tables;
    vm.addFlag = false;
    vm.newTable = {
      id: '',
      label: '',
      active: false
    };
    
    /*Methods*/
    vm.create = create;
    
    /*Functions*/
    function create() {
      if (vm.newTable.label==='' || !vm.newTable.label) vm.newTable.label=vm.newTable.id;
      tables.add(vm.newTable);
      Logger.log.table(vm.newTable.id, 'add');
      vm.newTable = {
        id: '',
        label: ''
      };
      vm.addFlag = false;
      Toast.flash('Table added successfully');
    }
    
  }
  /*close dhTableAddController*/
    
})();
