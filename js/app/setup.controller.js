(function() {
  'use strict';

  angular.module('dhtorchbearer.app')
    .controller('SetupCtrl', setupCtrl);

  /*Main Application Controller*/
  function setupCtrl(DB, Auth) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.ref = DB.ref;
    vm.role = "Master";
    vm.mode = "Setup Master";
  }

})();