(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.common')
    .factory('Users', users)
    .factory('UsersFactory', usersFactory);

  /*========================================================================
                                  Users
  =========================================================================*/
  /*Table factory function definition*/
  function users(UsersFactory) {
    return usersFactoryCall;

    function usersFactoryCall(ref) {
      return new UsersFactory(ref.child('users'));

    }
    /*close usersFactoryCall*/
  }
  /*close users*/

  function usersFactory($firebaseArray) {

    return $firebaseArray.$extend({
      getUser: getUser
    });

    function getUser(email) {
      /* jshint validthis: true */
      var vm = this;
      var list = vm.$list;
      for (var x=0; x<list.length;x++) {
        if (list[x].email==email) return list[x];
      }
      return false;
    }
  }
  /*close usersFactory*/

})();