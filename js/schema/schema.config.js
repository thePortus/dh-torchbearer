(function() {
  'use strict';

  /*Directive Definitionl*/
  angular.module('dhtorchbearer.schema', ['ngAnimate', 'ngAria', 'ngTouch', 'ngMaterial'])
    .filter('orderObjectBy', orderObjectBy)
    .filter('startFrom', startFrom)
    .filter('activeTables', activeTables);

    /*Filter Functions*/
  function orderObjectBy() {
    return orderedObjected;

    function orderedObject(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, itemPush);
      filtered.sort(filterItems);
      if (reverse) filtered.reverse();
      return filtered;

      function itemPush(item) {
        filtered.push(item);
      }

      function filterItems(a, b) {
        return (a[field] > b[field] ? 1 : -1);
      }
    }
    /*close orderedObject*/
  }
  /*close orderObjectBy*/

  function startFrom() {
    return function(input, start) {
      console.log(start + " | " + input);
      if (input) {
        start = +start;
        return input.slice(start);
      }
      return [];
    };
  }
  /*close startFrom*/

  function activeTables() {
    return function(items) {
      var filtered = [];

      angular.forEach(items, filterActiveTables);

      function filterActiveTables(item) {
        if (item.active === true) {
          filtered.push(item);
        }
      }

      return filtered;
    };
  }
  /*close activeTables*/

  
})();