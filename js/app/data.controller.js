(function() {
  'use strict';

  angular.module('dhtorchbearer.app')
    .controller('DataCtrl', dataCtrl);

  function dataCtrl(DB, Auth) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.ref = DB.ref;
    vm.role = Auth.user.role;

  }

})();