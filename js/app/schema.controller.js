(function() {
  'use strict';

  angular.module('dhtorchbearer.app')
    .controller('SchemaCtrl', schemaCtrl);

  function schemaCtrl(DB, Auth) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.ref = DB.ref;
    vm.role = Auth.user.role;
  }

})();