(function() {
  'use strict';

  /*Directive Definitionl*/
  angular.module('dhtorchbearer.login', ['ngAnimate', 'ngAria', 'ngTouch', 'ngMaterial', 'firebase']);
    
   /*Custom Angular Filters*/
  function orderObjectBy() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function(a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if (reverse) filtered.reverse();
      return filtered;
    };
  }

  /*Material Design Theme Configuration*/
  function mdThemeConfig($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('deep-orange')
      .warnPalette('pink');
  }
  
})();