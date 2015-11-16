(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTableExport', dhTableExport);

  /*Directive Definition*/
  function dhTableExport() {
    var directive = {
      templateUrl: 'js/data/table/export.template.html',
      scope: {
        tableid: '=',
        fields: '=',
        tabledata: '='
      },
      controller: dhTableExportController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableExportController(CSVExport) {
    /* jshint validthis: true */
    var vm = this;
    
    /*Properties*/
    vm.ready = false;
    vm.csvExport = [];

    /*Methods*/
    vm.generate = generate;

    /*Functions*/
    function generate() {
      vm.csvExport = new CSVExport(vm.fields, vm.tabledata);
      vm.csvExport.generateCSV();
      vm.ready=true;
    }
  }
  /*close dhTableExportController*/
    
})();