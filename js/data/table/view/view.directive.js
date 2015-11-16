(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTableView', dhTableView);

  /*Directive Definition*/
  function dhTableView() {
    var directive = {
      templateUrl: 'js/data/table/view/view.template.html',
      scope: {
        tableid: '=',
        tabledata: '=',
        fields: '=',
        searchterm: '=',
        hiddenfields: '=',
        role: '=',
        selectedentry: '=',
        options: '=',
        optiongroups: '='
      },
      controller: dhTableViewController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableViewController(Dialog, Data, Logger, Auth, Toast) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.sorting = {};
    vm.entry = {};
    vm.entryMode = false;
    vm.uploadFlag = false;

    /*Methods*/
    vm.add = add;
    vm.edit = edit;
    vm.remove = remove;

    /*On async data retreival*/
    vm.fields.$loaded(onLoadCB);

    /*Functions*/
    function onLoadCB() {
      if (vm.fields[0]) {
        vm.sorting.field = vm.fields[0].id;
        vm.sorting.reverse = false;
      }
    }

    function add() {
      vm.entryMode = "add";
    }

    function edit(entry) {
      vm.entryMode = "edit";
      vm.entry = entry;
    }

    function remove(entryObj) {
      var title = 'Remove entry';
      var msg = 'Are you sure you want to delete ' + getPrimaryKey(entryObj) + '? This action cannot be undone';
      Dialog.action(title, msg, removeCB);

      function removeCB() {
        Logger.log.entry(vm.tableid, getPrimaryKey(entryObj), 'remove', Auth.user.email);
        vm.tabledata.$remove(entryObj);
        Toast.flash('Entry successfully removed');
      }
    }

    function getPrimaryKey(entryObj) {
      return vm.tabledata.getPrimaryKey(entryObj, vm.fields);
    }

    function getByPrimaryKey(entryObj) {
      return vm.tabledata.getEntryByPrimaryKey(vm.getPrimaryKey(entryObj), vm.fields);
    }

  }
  /*close dhTableViewController*/

})();
