(function() {
  'use strict';

  /*Directive Definition*/
  angular.module('dhtorchbearer.schema')
    .directive('dhSchema', dhSchema);

  /*Directive Definition*/
  function dhSchema() {
    var directive = {
      templateUrl: 'js/schema/schema.template.html',
      scope: {
        ref: '=',
        role: '='
      },
      controller: dhSchemaController,
      controllerAs: 'vm',
      bindToController: true // because the scope is isolated
    };
    return directive;
  }

  /*Directive Controller*/
  function dhSchemaController(Schema) {
    /* jshint validthis: true */
    var vm = this;
    
    /*Properties*/
    vm.schema = new Schema(vm.ref, vm.role);
    vm.tables = vm.schema.tables;
  }
  /*close dhEditorController*/
    
})();