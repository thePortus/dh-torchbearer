(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTableUpload', dhTableUpload);

  /*Directive Definition*/
  function dhTableUpload() {
    var directive = {
      templateUrl: 'js/data/table/view/upload.template.html',
      scope: {
        fields: '=',
        tabledata: '='
      },
      controller: dhTableUploadController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableUploadController(CSVImport) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.validCSV = false;
    vm.checkedCSV = false;
    vm.overwriteFlag = false;
    vm.csv = new CSVImport(vm.fields, vm.tabledata);
    vm.errors = vm.csv.errors;
    
    /*Methods*/
    vm.checkCSV = checkCSV;
    vm.addCSV = addCSV;

    /*Functions*/
    function checkCSV(file) {
      console.log('Checking CSV...');
      vm.csv.read(file);
      vm.validCSV = vm.csv.validate();
      vm.checkedCSV = true;
    }
    
    function addCSV(file) {
      vm.checkCSV(file);
      if(vm.validCSV) vm.csv.create();
    }
  }
  /*close dhTableViewController*/

})();