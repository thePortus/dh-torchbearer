(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhTableEdit', dhTableEdit);

  /*Directive Definition*/
  function dhTableEdit() {
    var directive = {
      templateUrl: 'js/schema/tableedit.template.html',
      scope: {
        table: '=',
        schema: '='
      },
      controller: dhTableEditController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableEditController(Auth, Dialog, Toast, Schema, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var index = vm.schema.tables.exists;
    var tables = vm.schema.tables;

    /*Properties*/
    vm.viewFieldsFlag = false;
    vm.editTable = {
      id: tables[index(vm.table)].id,
      label: tables[index(vm.table)].label,
      active: tables[index(vm.table)].active
    };

    /*Methods*/
    vm.tables = tables;
    vm.fields = fields();
    vm.update = update;
    vm.remove = remove;
    vm.cancel = cancel;
    
    /*Functions*/
    function fields() {
      return vm.schema.fields(vm.table);
    }


    function update() {
      var updateTable = tables[index(vm.table)];
      var propertyKeys = Object.keys(vm.editTable);
      for (var x = 0; x < propertyKeys.length; x++) {
        updateTable[propertyKeys[x]] = vm.editTable[propertyKeys[x]];
      }
      vm.tables.$save(updateTable);
      Logger.log.table(vm.table, 'edit');
    }
    /*close update*/

    function cancel() {
      vm.editTable = {
        id: tables[index(vm.table)].id,
        label: tables[index(vm.table)].label,
        active: tables[index(vm.table)].active
      };
    }
    /*close cancel*/

    function remove() {
      var table = tables[index(vm.table)];
      var title = 'Remove Table';
      var msg = "Do you really want to delete " + table.label + "? This will delete the table and ALL of its data";
      Dialog.action(title, msg, removeCB);

      function removeCB() {
        vm.tables.remove(table.id);
        Logger.log.table(vm.table, 'remove');
      }
    }

  }
  /*close dhTableEditController*/

})();