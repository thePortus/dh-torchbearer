(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.common')
    .factory('Logger', logger)
    .factory('Log', logConstructor)
    .factory('LogFactory', logFactory);

  function logger(Log) {
    return new LoggerModel();

    function LoggerModel() {
      /* jshint validthis: true */
      var vm = this;

      /*Properties*/
      vm.log = null;

      /*Methods*/
      vm.initialize = initialize;

      /*Functions*/
      function initialize(ref) {
        vm.log = new Log(ref);
      }


    }
  }

  function logConstructor(LogFactory) {
    return logFactoryCall;

    function logFactoryCall(ref) {
      return new LogFactory(ref.child('logs'));
    }
    /*close logFactoryCall*/
  }
  /*close logConstructor*/

  /*Extends the $firebaseArray passed by the definitions instantiator*/
  function logFactory($firebaseArray, Auth) {

    return $firebaseArray.$extend({
      projectCreation: projectCreation,
      entry: entry,
      table: table,
      field: field,
      optionGroup: optionGroup,
      option: option,
      projectInfo: projectInfo,
      users: users,
      get: get
    });

    /*Extended Functions*/
    function projectCreation() {
      /* jshint validthis: true */
      var vm = this;
      var timeStamp = new Date();

      vm.$add({
        type: 'projectCreation',
        user: Auth.user.email,
        timeStamp: timeStamp.getTime()
      });
    }
    /*close projectCreation*/

    function entry(tableID, entryKey, action) {
      /* jshint validthis: true */
      var vm = this;
      var timeStamp = new Date();

      vm.$add({
        type: 'data',
        action: action,
        user: Auth.user.email,
        table: tableID,
        entry: entryKey,
        timeStamp: timeStamp.getTime()
      });
    }
    /*close entry*/

    function table(tableID, action) {
      /* jshint validthis: true */
      var vm = this;
      var timeStamp = new Date();

      vm.$add({
        type: 'table',
        action: action,
        table: tableID,
        user: Auth.user.email,
        timeStamp: timeStamp.getTime()
      });
    }
    /*close table*/

    function field(tableID, fieldID, action) {
      /* jshint validthis: true */
      var vm = this;
      var timeStamp = new Date();

      vm.$add({
        type: 'field',
        action: action,
        table: tableID,
        field: fieldID,
        user: Auth.user.email,
        timeStamp: timeStamp.getTime()
      });
    }
    /*close field*/

    function optionGroup(optionGroupID, action) {
      /* jshint validthis: true */
      var vm = this;
      var timeStamp = new Date();

      vm.$add({
        type: 'optionGroup',
        action: action,
        optionGroup: optionGroupID,
        user: Auth.user.email,
        timeStamp: timeStamp.getTime()
      });
    }
    /*close optionGroup*/

    function option(optionGroupID, optionID, action) {
      /* jshint validthis: true */
      var vm = this;
      var timeStamp = new Date();

      vm.$add({
        type: 'option',
        action: action,
        table: optionGroupID,
        field: optionID,
        user: Auth.user.email,
        timeStamp: timeStamp.getTime()
      });
    }
    /*close option*/

    function projectInfo(sectionName, action) {
      /* jshint validthis: true */
      var vm = this;
      var timeStamp = new Date();

      vm.$add({
        type: 'projectInfo',
        action: action,
        section: sectionName,
        user: Auth.user.email,
        timeStamp: timeStamp.getTime()
      });
    }
    /*close projectInfo*/

    function users(affectedUserEmail, action) {
      /* jshint validthis: true */
      var vm = this;
      var timeStamp = new Date();

      vm.$add({
        type: 'users',
        action: action,
        actingUser: Auth.user.email,
        affectedUser: affectedUserEmail,
        timeStamp: timeStamp.getTime()
      });
    }
    /*close users*/

    function get(type) {
      /* jshint validthis: true */
      var vm = this;
      var returnArray = [];
      for (var x = 0; x < vm.length; x++) {
        if (vm[x].type == type) returnArray.push(vm[x]);
      }
      return returnArray;
    }
  }
  /*end logFactory()*/

})();
