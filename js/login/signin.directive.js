(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.login')
    .directive('dhSignIn', dhSignIn);

  /*Directive Definition*/
  function dhSignIn() {
    var directive = {
      templateUrl: 'js/login/signin.template.html',
      scope: {
        ref: '=',
        mode: '='
      },
      controller: dhSignInController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhSignInController(Auth, UI, Toast) {
    /* jshint validthis: true */
    var vm = this;
    
    /*Properties*/
    vm.email = '';
    vm.password = '';
    
    /*Methods*/
    vm.login = login;
    
    /*Functions*/
    function login() {
      Auth.login(vm.email, vm.password, loginCB);
      
      function loginCB(error, authData) {
        if (error) {
          console.log(error.code);
          switch(error.code){
            case 'INVALID_USER':
              Toast.flash('Error: No user with that email exists');
              break;
            case 'INVALID_EMAIL':
              Toast.flash('Error: Invalid email');
              break;
            case 'INVALID_PASSWORD':
              Toast.flash('Error: Password is incorrect');
              break;
          }
        }
        else {
          Toast.flash('Signed in as ' + vm.email);
          UI.state('home');
        }
      }
    }
  }
  /*close dhSignInController*/
    
})();