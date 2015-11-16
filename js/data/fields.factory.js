(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.data')
    .factory('Fields', fieldsConstructor)
    .factory('FieldsFactory', fieldsFactory);

  /*Instantiates the table definitions for the schema sub-factory*/
  function fieldsConstructor(FieldsFactory) {
    return fieldsFactoryCall;

    function fieldsFactoryCall(ref) {
      return new FieldsFactory(ref);
    }
    /*close fieldsFactoryCall*/
  }
  /*close fields*/

  /*Extends the $firebaseArray passed by the definitions instantiator*/
  function fieldsFactory($firebaseArray) {

    return $firebaseArray.$extend({
      itemCount: itemCount,
      primaryKeys: primaryKeys,
      orderedFields: orderedFields
    });


    /*Extended Constructor Functions*/

    /*Returns total number of data items*/
    function itemCount() {
      /* jshint validthis: true */
      var vm = this;
      var list = vm.$list;
      return list.length;
    }

    function primaryKeys() {
      /* jshint validthis: true */
      var vm = this;
      var fields = vm.orderedFields();
      var orderedKeys = [];
      angular.forEach(fields, primaryKeyCB);
      return orderedKeys;
      
      function primaryKeyCB(value, key) {
        if(value.primaryKey) orderedKeys.push(value);
      }
    }

    function orderedFields() {
      /* jshint validthis: true */
      var vm = this;
      var returnArray = [];
      var list = vm.$list;

      for (var x=0; x<list.length; x++) {
        returnArray[list[x].order] = list[x];
      }
      return returnArray;
    }

  }
  /*end fieldsFactory()*/

})();