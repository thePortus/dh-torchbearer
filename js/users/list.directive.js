(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.users')
    .directive('dhUserList', dhUserList);

  /*Directive Definition*/
  function dhUserList() {
    var directive = {
      templateUrl: 'js/users/list.template.html',
      scope: {
        users: '=',
        ref: '=',
        role: '='
      },
      controller: dhUserListController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhUserListController($firebaseAuth, DBInfo, Dialog, Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.dbInfo = new DBInfo(vm.ref);

    /*Methods*/
    vm.update = update;
    vm.remove = remove;

    /*Functions*/
    function update(user) {
      Dialog.action('Change User Role?', 'Are you sure you want to change the role for ' + user.email + '?', updateUserCB);

      function updateUserCB() {
        vm.users.$save(user);
        Toast.flash('User role updated successfully');
        Logger.log.users(user.email, 'role edit');
      }
    }

    function remove(user) {
      vm.users.selected = user;
      Dialog.action('Remove User?', 'Are you sure you want to delete the account for ' + user.email + '? This cannot be undone', removeUserCB);

      function removeUserCB() {
        var baseRef = vm.users.$ref().root();
        var authObj = $firebaseAuth(baseRef);
        authObj.$removeUser({
          email: user.email,
          password: user.password
        });
        vm.users.$remove(user);
        Toast.flash('User removed successfully');
        Logger.log.users(user.email, 'removed');
      }
    }
  }
  /*close dhUserListController*/

})();
