(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.common')
    .factory('DBInfo', dbInfo)
    .factory('DBInfoFactory', dbInfoFactory);

  /*========================================================================
                                  Users
  =========================================================================*/
  /*Table factory function definition*/
  function dbInfo(DBInfoFactory) {
    return dbInfoFactoryCall;

    function dbInfoFactoryCall(ref) {
      return new DBInfoFactory(ref.child('torchbearer_info'));

    }
    /*close dbInfoFactoryCall*/
  }
  /*close dbInfo*/

  function dbInfoFactory($firebaseObject) {

    return $firebaseObject.$extend({
      exists: exists
    });

    function exists() {
      /* jshint validthis: true */
      var vm = this;

      if (vm.version) return true;
      else return false;
    }

  }
  /*close dbInfoFactory*/

})();