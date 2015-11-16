(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.users')
    .directive('dhUsers', dhUsers);

  /*Directive Definition*/
  function dhUsers() {
    var directive = {
      templateUrl: 'js/users/users.template.html',
      scope: {
        ref: '=',
        role: '='
      },
      controller: dhUsersController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhUsersController(Users) {
    /* jshint validthis: true */
    var vm = this;
    
    /*Properties*/
    vm.users = new Users(vm.ref);
    vm.addflag = false;
  }
  /*close dhDataController*/
    
})();