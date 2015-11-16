(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.login')
    .directive('dhRegister', dhRegister);

  /*Directive Definition*/
  function dhRegister() {
    var directive = {
      templateUrl: 'js/login/register.template.html',
      scope: {
        ref: '=',
        mode: '=',
        role: '='
      },
      controller: dhRegisterController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhRegisterController(Auth, DBInfo, UI, Toast, Dialog, APP_VERSION) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.email = '';
    vm.password = '';
    vm.passwordConfirm = '';

    /*Methods*/
    vm.register = register;

    /*Functions*/
    function register() {
      Dialog.action('Create New User', 'Confirm account creation for ' + vm.email, registerAction);
      
      function registerAction() {
        if (vm.password !== '' && vm.password == vm.passwordConfirm) Auth.register(vm.email, vm.password, vm.role, registerCB);
        else Toast.flash('Passwords do not match');

        function registerCB(error, authData) {
          if (error) {
            switch (error.code) {
              case 'EMAIL_TAKEN':
                Toast.flash('That email is already taken');
                break;
              case 'INVALID_EMAIL':
                Toast.flash('That email is invalid');
                break;
              default:
                Toast.flash('Error creating user');
            }
          } else {
            Toast.flash('Account created and signed in as ' + vm.email);
            if (vm.mode=='Setup Master') {
              var dbInfo = new DBInfo(vm.ref);
              dbInfo.version = APP_VERSION;
              dbInfo.masterAdmin = vm.email;
              dbInfo.$save();
              vm.mode='Setup Project';
            }
            else {
              UI.state('home');
            }
          }
        }
        /*close registerCB*/
      }
      /*close registerAction*/
    }
    /*close register*/
    
  }
  /*close dhRegisterController*/

})();