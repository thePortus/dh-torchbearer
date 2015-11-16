/*Function Wrapper.*/
(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.common')
    .factory('Dialog', dialogFactory);

  function dialogFactory($mdDialog) {
    function DialogFactoryModel() {
      /* jshint validthis: true */
      var vm = this;

      /*Properties*/
      vm.title = '';
      vm.contentMsg = '';
      vm.confirmMsg = 'OK';
      vm.cancelMsg = 'Cancel';

      /*Methods*/
      vm.alert = alertDialog;
      vm.action = actionDialog;

      /*===Start of Method Functions===*/
      /*Displays a simple dialog with specified content and a confirm
      button to close*/
      function alertDialog(title, contentMsg, confirmMsg, ariaLabel) {
        if (!title) {
          title = vm.title;
        }
        if (!ariaLabel) {
          ariaLabel = title;
        }
        if (!contentMsg) {
          contentMsg = vm.contentMsg;
        }
        if (!confirmMsg) {
          confirmMsg = vm.confirmMsg;
        }
        var dialog = $mdDialog.alert()
          .parent(angular.element(document.body))
          .title(title)
          .content(contentMsg)
          .ariaLabel(ariaLabel)
          .ok(vm.confirmMsg);
        $mdDialog.show(dialog);
      }

      function actionDialog(title, contentMsg, actionCallBack, cancelCallBack, confirmMsg, cancelMsg, ariaLabel) {
        if (!title) {
          title = vm.title;
        }
        if (!ariaLabel) {
          ariaLabel = title;
        }
        if (!contentMsg) {
          contentMsg = vm.contentMsg;
        }
        if (!confirmMsg) {
          confirmMsg = vm.confirmMsg;
        }
        if (!cancelMsg) {
          cancelMsg = vm.cancelMsg;
        }
        if (!actionCallBack) {
          actionCallBack = blankCallBack;
        }
        if (!cancelCallBack) {
          cancelCallBack = blankCallBack;
        }
        var dialog = $mdDialog.confirm()
          .parent(angular.element(document.body))
          .title(title)
          .content(contentMsg)
          .ariaLabel(ariaLabel)
          .ok(confirmMsg)
          .cancel(cancelMsg);

        $mdDialog.show(dialog).then(actionCallBack, cancelCallBack);

        function blankCallBack() {

        }
      }

    }
    return new DialogFactoryModel();
  }
  /*End view()*/

})();
/*End of Function Wrapper*/