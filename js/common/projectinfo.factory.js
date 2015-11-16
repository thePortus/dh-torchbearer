(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.common')
    .factory('ProjectInfo', projectInfo);

  function projectInfo($firebaseArray, $firebaseObject) {
    return projectInfoFactoryCall;

    function projectInfoFactoryCall(ref, role) {
      return new ProjectInfoFactory(ref, role);

      function ProjectInfoFactory(ref, role) {
        /* jshint validthis: true */
        var vm = this;
        
        vm.ref = ref.child('project_info');
        vm.role = role;
        
        vm.titles = $firebaseObject(vm.ref.child('titles'));
        vm.about = $firebaseArray(vm.ref.child('about'));
        vm.credits = $firebaseArray(vm.ref.child('credits'));

      }
      /*close ProjectInfoFactory*/
    }
    /*close projectInfoFactoryCall*/
  }
  /*close projectInfo*/

})();