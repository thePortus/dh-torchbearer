(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.data')
    .factory('CSVExport', csvExport);

  /*========================================================================
                                  CSVExport
  =========================================================================*/
  /*Table factory function definition*/
  function csvExport() {
    return csvExportFactoryCall;

    function csvExportFactoryCall(tableFields, tableData) {
      return new CSVExportFactory(tableFields, tableData);

      function CSVExportFactory(tableFields, tableData) {
        /* jshint validthis: true */
        var vm = this;

        /*Properties*/
        vm.url = '';
        vm.tableFields = tableFields.orderedFields();
        vm.tableData = tableData;

        /*Methods*/
        vm.generateCSV=generateCSV;

        /*Functions*/
        function generateCSV() {
          var content = '';

          /*Adding Column Headers*/
          for (var x = 0; x < tableFields.length; x++) {
            content += tableFields[x].id + ', ';
          }
          content += '\n';

          /*Adding Data Rows*/
          for (x = 0; x < tableData.length; x++) {
            for (var y = 0; y < tableFields.length; y++) {
              content += tableData[x][tableFields[y].id] + ', ';
            }
            content += '\n';
          }
          var blob = new Blob([content], {
            type: 'text/csv'
          });
          vm.url = (window.URL || window.webkitURL).createObjectURL(blob);
        }


      }
      /*close CSVExportFactory*/

    }
    /*close csvExportFactoryCall*/

  }
  /*close csvExport*/

})();
