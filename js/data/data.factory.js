(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.data')
    .factory('Data', data);

  /*========================================================================
                                  Data
  =========================================================================*/
  /*Table factory function definition*/
  function data($firebaseArray, Table, Fields) {
    return dataFactoryCall;

    function dataFactoryCall(ref, role) {
      return new DataFactory(ref, role);

      function DataFactory(ref, role) {
        /* jshint validthis: true */
        var vm = this;

        /*Properties*/
        vm.ref = ref;
        vm.role = role;
        vm.tableList = tableList;
        vm.fields = getfields;
        vm.table = getTable;
        vm.optionGroups = getOptionGroups;
        vm.options = getOptions;
        
        /*Returns an array of table definitions*/
        function tableList() {
          return $firebaseArray(vm.ref.child('schema').child('tables'));
        }
        /*close listTable*/

        function getfields(table) {
          return new Fields(vm.ref.child('schema').child('fields').child(table));
        }

        function getTable(tableID) {
          return new Table(vm.ref.child('data').child(tableID));
        }
        
        function getOptions(optionGroupID) {
          return $firebaseArray(vm.ref.child('schema').child('options').child(optionGroupID));
        }
        
        function getOptionGroups() {
          return $firebaseArray(vm.ref.child('schema').child('optionGroups'));
        }
        
      }
      /*close DataFactory*/
      
    }
    /*close dataFactoryCall*/
  }
  /*close data*/

})();