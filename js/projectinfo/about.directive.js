(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.projectinfo')
    .directive('dhProjectInfoAbout', dhProjectInfoAbout);

  /*Directive Definition*/
  function dhProjectInfoAbout() {
    var directive = {
      templateUrl: 'js/projectinfo/about.template.html',
      scope: {
        about: '=',
        role: '='
      },
      controller: dhProjectInfoAboutController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhProjectInfoAboutController(Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.addFlag = false;
    vm.editFlag = false;
    vm.addParagraph = {
      title: '',
      subTitle: ''
    };

    /*Methods*/
    vm.update = update;
    vm.add = add;

    /*Functions*/
    function add() {
      vm.about.$add(vm.addParagraph);
      Logger.log.projectInfo('about', 'add');
      vm.addFlag = false;
      vm.addParagraph = {
        title: '',
        subTitle: ''
      };
      Toast.flash('About this project paragraph successfully added');
    }

    function update() {
      for (var x = 0; x < vm.about.length; x++) {
        vm.about.$save(x);  
        Logger.log.projectInfo('about', 'edit');
        vm.addFlag = false;
        vm.editFlag = false;
        vm.addParagraph = {
          title: '',
          subTitle: ''
        };
        Toast.flash('About this project successfully updated');
      }
    }

  }
  /*close dhProjectInfoController*/

})();
