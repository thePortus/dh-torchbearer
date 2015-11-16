(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.common')
    .factory('DB', db);

  /*========================================================================
                                  Users
  =========================================================================*/
  /*Table factory function definition*/
  function db($firebase) {
    return new DBModel();

    function DBModel() {
      /* jshint validthis: true */
      var vm = this;
      
      /*Properties*/
      vm.ref = null;
      
      /*Methods*/
      vm.initialize = initialize;
      
      /*Functions*/
      function initialize(URL) {
        vm.ref = new Firebase(URL);
        return vm.ref;
      }

    }
    /*close DBModel*/


  }
  /*close DB*/


})();