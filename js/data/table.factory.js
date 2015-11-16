(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.data')
    .factory('Table', tableConstructor)
    .factory('TableFactory', tableFactory);

  /*Instantiates the table definitions for the schema sub-factory*/
  function tableConstructor(TableFactory) {
    return tableFactoryCall;

    function tableFactoryCall(ref) {
      return new TableFactory(ref);
    }
    /*close tableFactoryCall*/
  }
  /*close table*/

  /*Extends the $firebaseArray passed by the definitions instantiator*/
  function tableFactory($firebaseArray) {
    var entryVar = 0;
    var perPageVar = 10;

    return $firebaseArray.$extend({
      entry: entry,
      itemsPerPage: itemsPerPage,
      itemCount: itemCount,
      pageCount: pageCount,
      pageCurrent: pageCurrent,
      goToPage: goToPage,
      page: page,
      getPrimaryKey: getPrimaryKey,
      getEntryByPrimaryKey: getEntryByPrimaryKey
    });


    /*Extended Constructor Functions*/
    /*If sent an entry number, it updates and returns the value of the
    new internal entryVar. Else, it returns the value of the the old var*/
    function entry(entryNum) {
      if (entryNum || entryNum === 0) entryVar = entryNum;
      return entryVar;
    }

    /*If sent a itemsPerPageNum, changes the internal variable and returns
    the new result, otherwise returns the value of the old var*/
    function itemsPerPage(itemsPerPageNum) {
      if (itemsPerPageNum) perPageVar = itemsPerPageNum;
      return perPageVar;
    }
    /*Returns total number of data items*/
    function itemCount() {
      /* jshint validthis: true */
      var vm = this;
      var list = vm.$list;
      return list.length;
    }

    /*Returns total total number of pages, based on total number of entries
    and the number of items per page.*/
    function pageCount() {
      /* jshint validthis: true */
      var vm = this;
      return Math.ceil(vm.itemCount() / vm.itemsPerPage());
    }

    /*Returns the current page number, based off of the starting entry and
    the number of items per page.*/
    function pageCurrent() {
      /* jshint validthis: true */
      var vm = this;
      return Math.ceil(vm.entry() / vm.itemsPerPage());
    }

    /*Receives a page number, calculates the starting position for the page,
    and changes the current entry number to reflect the position. Returns
    false if the page number is outside of the possible range.*/
    function goToPage(pageNum) {
      /* jshint validthis: true */
      var vm = this;
      if (pageNum < 0 || pageNum >= vm.pageCount()) return false;
      vm.entry(pageNum * vm.itemsPerPage()-1);
      return true;
    }

    function page() {
      /* jshint validthis: true */
      var vm = this;
      var start = vm.entry();
      var end = vm.entry() + vm.itemsPerPage() - 1;
      if (end > vm.itemCount()) end = vm.itemCount();
      var returnEntries = [];
      var list = vm.$list;
      for (var x = start; x < end; x++) {
        returnEntries.push(list[x]);
      }
      return returnEntries;
    }

    /*Receives an entry object passed from a directive call, checks which
    properties are primary keys, and uses them in order to build a return string
    which represents the unique primary key for that entry*/
    function getPrimaryKey(entryObj, fields) {
      /* jshint validthis: true */
      var vm = this;
      var primaryKeys = fields.primaryKeys();
      var returnKey = '';

      for (var x = 0; x < primaryKeys.length; x++) {
        if (x > 0) returnKey += '|';
        returnKey += entryObj[primaryKeys[x].id];
      }
      return returnKey;
    }
    
    /*Receives a string represnting the primary key, and the fields array,
    and loops through the table entry and returns the entry with a matching
    primary key. Returns false if no match is found*/
    function getEntryByPrimaryKey(primaryKey, fields) {
      /* jshint validthis: true */
      var vm = this;
      var list = vm.$list;
      var matchingEntry = false;
      if(list.length>0) angular.forEach(list, checkEntryKeyCB);
      return matchingEntry;
      
      function checkEntryKeyCB(value, key) {
        if (vm.getPrimaryKey(value,fields)==primaryKey) {
          matchingEntry = value;
        }
      }
    }

  }
  /*end tableFactory()*/

})();