(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhOptionEdit', dhOptionEdit);

  /*Directive Definition*/
  function dhOptionEdit() {
    var directive = {
      templateUrl: 'js/schema/optionedit.template.html',
      scope: {
        group: '=',
        option: '=',
        schema: '='
      },
      controller: dhOptionEditController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhOptionEditController(Dialog, Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var options = vm.schema.options(vm.group);
    var optionGroups = vm.schema.optionGroups;
    var editOption = {};

    /*Properties*/
    vm.options = options;
    vm.optionGroups = optionGroups;
    vm.viewOptionGroupsFlag = false;
    vm.editOption = {};
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
    options.$loaded(loadedCB);

    function loadedCB() {
      editOption = vm.options[vm.options.exists(vm.option)];
      vm.editOption = editOption;
    }

    /*Method Functions*/
    function update() {
      var updateOption = vm.options[vm.options.exists(vm.option)];
      var propertyKeys = Object.keys(vm.editOption);
      for (var x = 0; x < propertyKeys.length; x++) {
        updateOption[propertyKeys[x]] = vm.editOption[propertyKeys[x]];
      }
      options.$save(updateOption);
      Logger.log.option(vm.group, vm.option, 'edit');
      Toast.flash('Option updated successfully');
    }
    /*close update*/

    function cancel() {
      vm.editOption = editOption;
    }

    function remove() {
      var option = vm.options[vm.options.exists(vm.option)];
      var title = 'Remove Option';
      var msg = "Do you really want to delete " + option.label + "?";
      Dialog.action(title, msg, removeCB);

      function removeCB() {
        vm.options.remove(option.id);
        Logger.log.option(vm.group, vm.option, 'remove');
        Toast.flash('Option removed successfully');
      }
    }

  }
  /*close dhOptionEditController*/

})();
