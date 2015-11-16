(function() {
  'use strict';

  angular.module('dhtorchbearer.app')
    .controller('UsersCtrl', usersCtrl);

  /*Main Application Controller*/
  function usersCtrl(DB, Auth) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.ref = DB.ref;
    vm.role = Auth.user.role;
    
  }

})();