(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhGroupEdit', dhGroupEdit);

  /*Directive Definition*/
  function dhGroupEdit() {
    var directive = {
      templateUrl: 'js/schema/groupedit.template.html',
      scope: {
        group: '=',
        schema: '='
      },
      controller: dhGroupEditController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhGroupEditController(Dialog, Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;
    var groups = vm.schema.optionGroups;
    var options = optionsFunction;
    var index = groups.exists;

    /*Properties*/
    vm.groups = groups;
    vm.options = options();
    vm.index = index;
    vm.viewOptionsFlag = false;
    vm.editGroup = {
      id: groups[index(vm.group)].id,
      label: groups[index(vm.group)].label
    };

    /*Methods*/
    vm.update = update;
    vm.remove = remove;

    /*Functions*/
    function optionsFunction() {
      return vm.schema.options(vm.group);
    }

    function update() {
      var updateGroup = groups[index(vm.group)];
      var propertyKeys = Object.keys(vm.editGroup);
      for (var x = 0; x < propertyKeys.length; x++) {
        updateGroup[propertyKeys[x]] = vm.editGroup[propertyKeys[x]];
      }
      groups.$save(updateGroup);
      Logger.log.optionGroup(vm.group, 'edit');
      Toast.flash('Option group updated sucessfully');
    }
    /*close update*/

    function remove() {
      var group = groups[index(vm.group)];
      var title = 'Remove Group';
      var msg = "Do you really want to delete " + group.label + "?";
      Dialog.action(title, msg, removeCB);

      function removeCB() {
        vm.groups.remove(group.id);
        Logger.log.optionGroup(vm.group, 'remove');
        Toast.flash('Option group removed successfully');
      }
    }
  }

  /*close dhGroupEditController*/

})();