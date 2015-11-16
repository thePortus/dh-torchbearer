(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhFieldEdit', dhFieldEdit);

  /*Directive Definition*/
  function dhFieldEdit() {
    var directive = {
      templateUrl: 'js/schema/fieldedit.template.html',
      scope: {
        table: '=',
        field: '=',
        schema: '='
      },
      controller: dhFieldEditController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhFieldEditController(Dialog, Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var fields = vm.schema.fields(vm.table);
    var optionGroups = vm.schema.optionGroups;
    var editField = {};
    
    /*Properties*/
    vm.fields = fields;
    vm.optionGroups = optionGroups;
    vm.viewOptionGroupsFlag = false;
    vm.editField = {};
    vm.inputTypes = [{
      id: 'input',
      label: 'Standard Input'
    }, {
      id: 'textarea',
      label: 'Large Text Area'
    }, {
      id: 'select',
      label: 'Select Menu'
    }, {
      id: 'checkbox',
      label: 'Checkbox Menu'
    }, {
      id: 'toggle',
      label: 'True/False Toggle'
    }];
    vm.dataTypes = [{
      id: 'text',
      label: 'Text (Alphanumeric)'
    }, {
      id: 'number',
      label: 'Numeric'  
    }, {
      id: 'date',
      label: 'Date'  
    }, {
      id: 'url',
      label: 'URL'  
    }, {
      id: 'email',
      label: 'Email'  
    }];

    /*Methods*/
    vm.update = update;
    vm.remove = remove;
    vm.cancel = cancel;
    
    /*On data load*/
    fields.$loaded(loadedCB);

    function loadedCB() {
      editField = vm.fields[vm.fields.exists(vm.field)];
      vm.editField = editField;
    }
    
    /*Method Functions*/
    function update() {
      var updateField=vm.fields[vm.fields.exists(vm.field)];
      var propertyKeys = Object.keys(vm.editField);
      for(var x=0; x<propertyKeys.length; x++) {
        updateField[propertyKeys[x]]=vm.editField[propertyKeys[x]];
      }
      fields.$save(updateField);
      Logger.log.field(vm.table, vm.field, 'edit');
      Toast.flash('Field updated successfully');
    }
    /*close update*/
    
    function cancel() {
      vm.editField = editField;
    }
    
    function remove() {
      var field = vm.fields[vm.fields.exists(vm.field)];
      var title = 'Remove Field';
      var msg = "Do you really want to delete " + field.label + "? Any data in this field will no longer appear";
      Dialog.action(title, msg, removeCB);
      
      function removeCB() {
        vm.fields.remove(field.id);
        Logger.log.field(vm.table, vm.field.id, 'remove');
        Toast.flash('Field removed successfully');
      }
    }

  }
  /*close dhFieldEditController*/

})();