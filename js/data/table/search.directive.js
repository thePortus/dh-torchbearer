(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.data')
    .directive('dhTableSearch', dhTableSearch);

  /*Directive Definition*/
  function dhTableSearch() {
    var directive = {
      templateUrl: 'js/data/table/search.template.html',
      scope: {
        term: '='
      },
      controller: dhTableSearchController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhTableSearchController() {
    /* jshint validthis: true */
    var vm = this;
    
    /*Properties*/
    
  }
  /*close dhTableSearchController*/
    
})();