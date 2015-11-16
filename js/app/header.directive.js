(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.app')
    .directive('dhAppHeader', dhAppHeader);

  /*Directive Definition*/
  function dhAppHeader() {
    var directive = {
      templateUrl: 'js/app/header.template.html',
      scope: {
        role: '='
      },
      controller: dhAppHeaderController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhAppHeaderController(Auth, DB, ProjectInfo, UI, Toast, APP_TITLE, APP_VERSION, APP_CREDITS, APP_RIGHTS) {
    /* jshint validthis: true */
    var vm = this;
    
    /*Properties*/
    vm.auth = Auth;
    vm.projectInfo = new ProjectInfo(DB.ref);
    vm.appTitle = APP_TITLE;
    vm.appVersion = APP_VERSION;
    vm.appCredits = APP_CREDITS;
    vm.appRights = APP_RIGHTS;
    
    /*Methods*/
    vm.change = change;
    vm.logout = logout;
    
    /*Functions*/
    function change(state) {
      UI.state(state);
    }
    
    function logout() {
      vm.auth.logout(logoutCB);
      
      function logoutCB() {
        Toast.flash('Logged out');
        UI.state('login');
      }
    }
  }
  /*close dhRegisterController*/
    
})();