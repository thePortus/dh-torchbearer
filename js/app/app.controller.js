(function() {
  'use strict';

  angular.module('dhtorchbearer.app')
    .controller('AppCtrl', appCtrl);

  /*Main Application Controller*/
  function appCtrl(FBURL, DB, DBInfo, Auth, Logger, UI, Dialog) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.loading = true;
    vm.auth = Auth;

    /*Methods*/
    vm.initialize = initialize;
    
    /*Initialization Call*/
    vm.initialize();
    
    /*Functions*/
    function initialize() {
      var dbInfo = null;
      DB.initialize(FBURL);
      dbInfo = new DBInfo(DB.ref);
      dbInfo.$loaded(onDBLoadCB);
      
      function onDBLoadCB() {
        Logger.initialize(DB.ref);
        vm.loading = false;
        if (dbInfo.exists()) {
          if(!vm.auth.authorized(DB.ref)) UI.state('login');
          else UI.state('home');
        }
        else {
          Auth.authorized(DB.ref);
          Dialog.alert('Configure New Project', 'Existing project not found at ' + FBURL + ', proceeding to project configuration');
          UI.state('setup');
        }
      }
    }
  }

})();