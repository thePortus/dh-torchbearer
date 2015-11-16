(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.schema')
    .factory('Schema', schema)
    .factory('Definition', definition)
    .factory('DefinitionFactory', definitionFactory);

  /*========================================================================
                                  SCHEMA
  =========================================================================*/
  /*Table factory function definition*/
  function schema(Definition) {
    return schemaFactoryCall;

    function schemaFactoryCall(ref, role) {
      return new SchemaFactory(ref, role);

      function SchemaFactory(ref, role) {
        /* jshint validthis: true */
        var vm = this;

        /*Properties*/
        vm.ref = ref;
        vm.role = role;
        vm.tables = new Definition(vm.ref.child('schema').child('tables'));
        vm.fields = getFields;
        vm.optionGroups = new Definition(vm.ref.child('schema').child('optionGroups'));
        vm.options = getOptions;

        function getFields(table) {
          return new Definition(vm.ref.child('schema').child('fields').child(table));
        }

        function getOptions(group) {
          return new Definition(vm.ref.child('schema').child('options').child(group));
        }
      }
      /*close SchemaFactory*/
    }
    /*close schemaFactoryCall*/
  }
  /*close schema*/

  /*========================================================================
                              Definition
    =========================================================================*/

  /*Instantiates the table definitions for the schema sub-factory*/
  function definition(DefinitionFactory) {
    return definitionFactoryCall;

    function definitionFactoryCall(ref) {
      return new DefinitionFactory(ref);
    }
    /*close definitionFactoryCall*/
  }
  /*close definition*/

  /*Extends the $firebaseArray passed by the definitions instantiator*/
  function definitionFactory($firebaseArray, Logger) {
    return $firebaseArray.$extend({
      count: count,
      exists: exists,
      getByOrder: getByOrder,
      moveUp: moveUp,
      moveDown: moveDown,
      add: add,
      remove: remove,
      primaryKeys: primaryKeys,
      activate: activate
    });
    
    /*Returns the total number of entries in a definition*/
    function count() {
      /* jshint validthis: true */
      var vm = this;
      return vm.$list.length;
    }
    /*close count*/

    /*Checks for an entry by .id property, returns array index of the entry,
    returns false if non-existent*/
    function exists(id) {
      /* jshint validthis: true */
      var vm = this;

      for (var x = 0; x < vm.count(); x++) {
        if (vm.$list[x].id == id) return x;
      }
      return false;
    }
    /*close exists*/

    /*Returns the array index of the entry with matching .order property,
    returns false if non-existent*/
    function getByOrder(orderIndex) {
      /* jshint validthis: true */
      var vm = this;

      for (var x = 0; x < vm.count(); x++) {
        if (vm.$list[x].order == orderIndex) return x;
      }
      return false;
    }
    /*close order*/

    /*Lowers the .order property of entry with matching ID, also raises the
    .order property of the entry with which it is switching places. Returns
    false if the entry already has a .order of 0.*/
    function moveUp(id) {
      /* jshint validthis: true */
      var vm = this;
      var list = vm.$list;
      var upEntryIndex = vm.exists(id);
      var upEntryOrder = list[upEntryIndex].order;
      if (upEntryOrder === 0) return false;
      var downEntryIndex = vm.getByOrder(upEntryOrder - 1);
      list[upEntryIndex].order--;
      list[downEntryIndex].order++;
      list.$save(upEntryIndex);
      list.$save(downEntryIndex);
    }
    /*close moveUp*/

    /*Raises the .order property of entry with matching ID, also lowers the
    .order property of the entry with which it is switching places. Returns
    false if the entry already has the highest .order property*/
    function moveDown(id) {
      /* jshint validthis: true */
      var vm = this;
      var list = vm.$list;
      var downEntryIndex = vm.exists(id);
      var downEntryOrder = list[downEntryIndex].order;
      if (downEntryOrder === vm.count() - 1) return false;
      var upEntryIndex = vm.getByOrder(downEntryOrder + 1);
      list[upEntryIndex].order--;
      list[downEntryIndex].order++;
      list.$save(upEntryIndex);
      list.$save(downEntryIndex);
    }
    /*close moveDown*/

    /*Receives an entry object, adds it to the firebaseArray, adding the next
    .order value to it. Returns false if an entry of that ID already exists*/
    function add(entry) {
      /* jshint validthis: true */
      var vm = this;
      vm.$loaded().then(addCB);

      function addCB() {
        entry.order = vm.count();
        if (vm.exists(entry.id) !== false) return false;
        vm.$add(entry);
      }
    }
    /*close add*/

    function remove(table) {
      /* jshint validthis: true */
      var vm = this;
      var index = vm.exists(table);
      if (index === false) return false;
      vm.$remove(index);
    }
    /*close remove*/

    function primaryKeys() {
      /* jshint validthis: true */
      var vm = this;
      var fieldList = vm.$list;
      var keyList = [];
      for (var x = 0; x < vm.count(); x++) {
        if (fieldList[x].primaryKey === true) keyList.push(fieldList[x].id);
      }
      return keyList;
    }
    /*close primaryKeys*/

    function activate(table) {
      /* jshint validthis: true */
      var vm = this;
      var index = vm.exists(table);
      if (index === false) return false;
      var list = vm.$list;
      list[index].active = !list[index].active;
      list.$save(index);
    }

  }
  /*end definitionFactory()*/

})();
