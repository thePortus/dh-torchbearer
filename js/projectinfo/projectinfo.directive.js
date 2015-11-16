(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.projectinfo')
    .directive('dhProjectInfo', dhProjectInfo);

  /*Directive Definition*/
  function dhProjectInfo() {
    var directive = {
      templateUrl: 'js/projectinfo/projectinfo.template.html',
      scope: {
        ref: '=',
        role: '=',
        mode: '='
      },
      controller: dhProjectInfoController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhProjectInfoController(ProjectInfo, UI, Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.projectInfo = new ProjectInfo(vm.ref);
    
    /*Methods*/
    vm.establish = establish;
    
    /*Functions*/
    function establish() {
      UI.state('home');
      Toast.flash('Project Successfully Created');
      Logger.log.projectCreation();
    }

  }
  /*close dhProjectInfoController*/

})();