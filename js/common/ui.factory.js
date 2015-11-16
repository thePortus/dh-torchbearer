(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.common')
    .factory('UI', ui);

  function ui($state, $stateParams) {
    return new UIModel();
    
    function UIModel() {
      /* jshint validthis: true */
      var vm = this;
      
      /*Methods*/
      vm.state = state;
      vm.refresh = refresh;

      /*===Start of Method Functions===*/
      function state(toState) {
        if (toState) $state.go(toState);
        else return $state.current;
      }

      function refresh() {
        $state.go($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      }

    }
    /*close UIModel*/
    
  }
  /*close ui*/

})();