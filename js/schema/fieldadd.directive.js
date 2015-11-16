(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhFieldAdd', dhFieldAdd);

  /*Directive Definition*/
  function dhFieldAdd() {
    var directive = {
      templateUrl: 'js/schema/fieldadd.template.html',
      scope: {
        table: '=',
        schema: '='
      },
      controller: dhFieldAddController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhFieldAddController(Dialog, Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var fields = vm.schema.fields(vm.table);
    var optionGroups = vm.schema.optionGroups;

    /*Properties*/
    vm.fields = fields;
    vm.optionGroups = optionGroups;
    vm.addFlag = false;
    vm.newField = {
      id: '',
      label: '',
      inputType: '',
      dataType: '',
      options: '',
      placeholder: '',
      helpText: '',
      primaryKey: '',
      required: '',
      order: 0
    };
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
    vm.create = create;

    /*Method Functions*/
    function create() {
      if (vm.newField.label === '' || !vm.newField.label) vm.newField.label = vm.newField.id;
      fields.add(vm.newField);
      Logger.log.field(vm.table, vm.newField.id, 'add');
      vm.newField = {
        id: '',
        label: '',
        inputType: '',
        dataType: '',
        options: '',
        placeholder: '',
        helpText: '',
        primaryKey: '',
        required: '',
        order: ''
      };
      vm.addFlag = false;
      Toast.flash('Field added successfully');
    }

  }
  /*close dhFieldAddController*/

})();
