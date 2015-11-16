(function() {
  'use strict';

  angular.module('dhtorchbearer.app')
    .controller('HomeCtrl', homeCtrl);

  /*Main Application Controller*/
  function homeCtrl(Auth) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.user = Auth.user;
    
  }

})();