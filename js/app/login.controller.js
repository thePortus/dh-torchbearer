(function() {
  'use strict';

  angular.module('dhtorchbearer.app')
    .controller('LoginCtrl', loginCtrl);

  /*Main Application Controller*/
  function loginCtrl(DB) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.ref = DB.ref;
    vm.mode = "Sign In";
    vm.role = 'User';
  }

})();