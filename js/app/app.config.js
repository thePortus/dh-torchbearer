(function() {
  'use strict';

  /*Directive Definitionl*/
  angular.module('dhtorchbearer.app', ['ngAnimate', 'ngAria', 'ngTouch', 'ngMaterial', 'ui.router', 'dhtorchbearer.common', 'dhtorchbearer.login', 'dhtorchbearer.projectinfo', 'dhtorchbearer.users', 'dhtorchbearer.schema', 'dhtorchbearer.data'])
    .constant('APP_TITLE', 'DH Torchbearer')
    .constant('APP_VERSION', '0.0.10')
    .constant('APP_CREDITS', 'Created by David Thomas')
    .constant('APP_RIGHTS', 'Copyright, © 2015')
    .filter('orderObjectBy', orderObjectBy)
    .config(mdThemeConfig)
    .config(configRouter)
    .config(urlEnable);

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

  function urlEnable($compileProvider) {
     $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
  }

  /*UI Router Configuration*/
  function configRouter($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $urlRouterProvider.when('', '/');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'js/app/home.template.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'js/app/login.template.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('setup', {
        url: '/setup',
        templateUrl: 'js/app/setup.template.html',
        controller: 'SetupCtrl',
        controllerAs: 'vm'
      })
      .state('projectinfo', {
        url: '/projectinfo',
        templateUrl: 'js/app/projectinfo.template.html',
        controller: 'ProjectInfoCtrl',
        controllerAs: 'vm'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'js/app/users.template.html',
        controller: 'UsersCtrl',
        controllerAs: 'vm'
      })
      .state('schema', {
        url: '/schema',
        templateUrl: 'js/app/schema.template.html',
        controller: 'SchemaCtrl',
        controllerAs: 'vm'
      })
      .state('data', {
        url: '/data',
        templateUrl: 'js/app/data.template.html',
        controller: 'DataCtrl',
        controllerAs: 'vm'
      });
  }

})();