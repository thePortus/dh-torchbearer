/*Function Wrapper.*/
(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.common')
    .factory('Toast', toastFactory);

  function toastFactory($mdToast) {
    function ToastFactoryModel() {
      /* jshint validthis: true */
      var vm = this;

      /*Properties*/
      vm.messagePosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
      vm.messageDelay = 3000;
      vm.confirmMessage = "OK";

      /*Methods*/
      vm.getPosition = getPosition;
      vm.setPosition = setPosition;
      vm.flash = flash;
      vm.action = action;
      
      /*===Start of Method Functions===*/

      /*Returns an object containiner the current position for the toast notification*/
      function getPosition() {
        return Object.keys(vm.messagePosition)
          .filter(getPositionCallBack)
          .join(' ');
        /*Links the boolean position values with respective keys*/
        function getPositionCallBack(pos) {
          return vm.messagePosition[pos];
        }
      }

      /*Sets the position object on the basis of a simple received string*/
      function setPosition(position) {
        if (position == 'top-left') {
          vm.messagePosition = {
            bottom: false,
            top: true,
            left: true,
            right: false
          };
        }
        if (position == 'top-right') {
          vm.messagePosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
          };
        }
        if (position == 'bottom-left') {
          vm.messagePosition = {
            bottom: true,
            top: false,
            left: true,
            right: false
          };
        }
        if (position == 'bottom-right') {
          vm.messagePosition = {
            bottom: true,
            top: false,
            left: false,
            right: true
          };
        }
      }

      /*Displays a simple toast notification, with only a simple string for content,
        defaults to current position and delay unless specified*/
      function flash(content, position, delay) {
        if (position) vm.setPosition(position);
        else vm.setPosition('bottom-right');
        if (delay) vm.messageDelay = delay;
        else vm.messageDelay = 3000;
        
        var toast = $mdToast.simple()
          .content(content)
          .position(vm.getPosition())
          .hideDelay(vm.messageDelay);
        $mdToast.show(toast);
      }

      /*Displays a toast notification requiring a click-confirmation, defaults
      to current confirmation messages and position unless specified*/
      function action(content, callBack, confirm, position, delay) {
        if (confirm) {
          vm.confirmMessage = confirm;
        }
        if (position) {
          vm.setPosition(position);
        }
        if (delay) {
          vm.messageDelay = delay;
        }
        var toast = $mdToast.simple()
          .content(content)
          .position(vm.getPosition())
          .hideDelay(vm.messageDelay)
          .action(vm.confirmMessage)
          .highlightAction(false);
          
        $mdToast.show(toast).then(callBack);
      }

    }
    return new ToastFactoryModel();
  }
  /*close view*/

})();