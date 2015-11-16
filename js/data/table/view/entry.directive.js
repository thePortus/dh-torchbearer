(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTableEntry', dhTableEntry);

  /*Directive Definition*/
  function dhTableEntry() {
    var directive = {
      templateUrl: 'js/data/table/view/entry.template.html',
      scope: {
        tableid: '=',
        mode: '=',
        options: '=',
        optiongroups: '=',
        fields: '=',
        tabledata: '=',
        entry: '='
      },
      controller: dhTableEntryController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableEntryController(Auth, Dialog, Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.fieldOptions = {};

    /*Methods*/
    vm.create = create;
    vm.edit = edit;
    vm.cancel = cancel;

    /*On Async data retreival*/
    vm.optiongroups.$loaded(loadOptionsCB);

    /*Functions*/
    function loadOptionsCB() {
      var list = vm.optiongroups;
      angular.forEach(list, optionGroupCB);

      function optionGroupCB(value, key) {
        vm.fieldOptions[value.id] = vm.options(value.id);
      }
    }

    function create() {
      vm.entry = cleanEntry(vm.entry);
      var newEntryPrimaryKey = vm.tabledata.getPrimaryKey(vm.entry, vm.fields);
      var doesKeyExist = vm.tabledata.getEntryByPrimaryKey(newEntryPrimaryKey, vm.fields);
      if (doesKeyExist === false) {
        vm.tabledata.$add(vm.entry);
        Logger.log.entry(vm.tableid, newEntryPrimaryKey, 'add', Auth.user.email);
        vm.cancel();
        Toast.flash('Entry successfully added');
      } else {
        Dialog.alert('Error, an entry with a matching key already exists');
      }
    }

    function edit() {
      vm.entry = cleanEntry(vm.entry);
      vm.tabledata.$save(vm.entry);
      Logger.log.entry(vm.tableid, vm.tabledata.getPrimaryKey(vm.entry, vm.fields), 'edit', Auth.user.email);
      vm.cancel();
      Toast.flash('Entry successfully edited');
    }

    function cancel() {
      vm.entry = {};
      vm.mode = false;
    }

    /*Cleans a given entry in preparation for saving to Firebase.*/
    function cleanEntry(entry) {
      var cleanString = '';
      for (var x = 0; x < vm.fields.length; x++) {
        /*Converting JS Date objects to strings formatted as MM/DD/YYYY*/
        if (vm.fields[x].dataType == 'date') {
          entry[vm.fields[x].id] = (entry[vm.fields[x].id].getMonth() + 1) + '/' + entry[vm.fields[x].id].getDate() + '/' + entry[vm.fields[x].id].getFullYear();
        }
      }
      /*close entry fields loop*/

      return entry;
    }
    /*close cleanEntry*/

  }
  /*close dhTableEntryController*/

})();
