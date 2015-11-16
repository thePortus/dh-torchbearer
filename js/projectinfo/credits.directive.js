(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.projectinfo')
    .directive('dhProjectInfoCredits', dhProjectInfoCredits);

  /*Directive Definition*/
  function dhProjectInfoCredits() {
    var directive = {
      templateUrl: 'js/projectinfo/credits.template.html',
      scope: {
        credits: '=',
        role: '='
      },
      controller: dhProjectInfoCreditsController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhProjectInfoCreditsController(Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.addFlag = false;
    vm.editFlag = false;
    vm.addCredit = {
      title: '',
      subTitle: ''
    };

    /*Methods*/
    vm.update = update;
    vm.add = add;

    /*Functions*/
    function add() {
      vm.credits.$add(vm.addCredit);
      Logger.log.projectInfo('credits', 'add');
      vm.addFlag = false;
      vm.addParagraph = {
        title: '',
        subTitle: ''
      };
      Toast.flash('Credits paragraph successfully added');
    }

    function update() {
      for (var x = 0; x < vm.credits.length; x++) {
        vm.credits.$save(x);
        Logger.log.projectInfo('credits', 'edit');
        vm.addFlag = false;
        vm.editFlag = false;
        vm.addCredit = {
          title: '',
          subTitle: ''
        };
        Toast.flash('Credits successfully updated');
      }
    }
  }
  /*close dhProjectInfoController*/

})();
