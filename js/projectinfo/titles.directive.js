(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.projectinfo')
    .directive('dhProjectInfoTitles', dhProjectInfoTitles);

  /*Directive Definition*/
  function dhProjectInfoTitles() {
    var directive = {
      templateUrl: 'js/projectinfo/titles.template.html',
      scope: {
        role: '=',
        titles: '='
      },
      controller: dhProjectInfoTitlesController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhProjectInfoTitlesController(Toast, Logger) {
    /* jshint validthis: true */
    var vm = this;

    /*Properties*/
    vm.editFlag = false;
    vm.title = '';
    vm.subTitle = '';

    /*Methods*/
    vm.update = update;

    /*On async data load*/
    vm.titles.$loaded(initializeCB);

    /*Functions*/
    function initializeCB() {
      vm.title = vm.titles.title;
      vm.subTitle = vm.titles.subTitle;
    }

    function update() {
      vm.titles.title = vm.title;
      vm.titles.subTitle = vm.subTitle;
      vm.titles.$save();
      Logger.log.projectInfo('titles', 'edit');
      Toast.flash('Title information successfully updated');
      vm.editFlag = false;
    }

  }
  /*close dhProjectInfoController*/

})();
