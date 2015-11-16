(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.users')
    .directive('dhUserCreate', dhUserCreate);

  /*Directive Definition*/
  function dhUserCreate() {
    var directive = {
      templateUrl: 'js/users/create.template.html',
      scope: {
        users: '=',
        role: '=',
        addflag: '='
      },
      controller: dhUserCreateController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhUserCreateController(Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.submitted = false;
    vm.newUser = {
      email: '',
      password: '',
      confirmPassword: ''
    };
    vm.errors = [];
    
    /*Methods*/
    vm.clear = clear;
    vm.create = create;

    /*Functions*/
    function clear() {
      vm.submitted = false;
      vm.newUser = {
        email: '',
        password: '',
        confirmPassword: ''
      };
      vm.addflag = false;
      vm.errors = [];
    }


    function validate() {
      vm.errors = [];
      vm.submitted = true;
      if (vm.newUser.password != vm.newUser.confirmPassword) {
        vm.errors.push('Passwords must match');
        return false;
      }
      if (vm.users.getUser(vm.newUser.email)) {
        vm.errors.push('User with that email already found');
        return false;
      }
      return true;
    }

    function create() {
      if (validate()) {
        var baseRef = vm.users.$ref().root();
        baseRef.createUser({
          email: vm.newUser.email,
          password: vm.newUser.password
        }, createUserCB);
      }

      function createUserCB(error, userData) {
        if (error) console.log(error);
        else {
          vm.users.$add({
            email: vm.newUser.email,
            password: vm.newUser.password,
            uid: userData.uid,
            role: 'User'
          });
          Logger.log.user(vm.newUser.email, 'add');
          Toast.flash('Account created successfully');
          vm.clear();
        }

      }
    }

  }
  /*close dhUserCreateController*/

})();