(function () {
  'use strict';

  var dependencies = ['$routeProvider', '$httpProvider', '$locationProvider', 'VIEWS'];

  function config ($routeProvider, $httpProvider, $locationProvider, VIEWS) {
    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/platform', {controller : 'TestRestCtrl', templateUrl: VIEWS.controllers.TestRestCtrl})

      .otherwise('/404');
  }

  config.$inject = dependencies;

  angular
    .module('tourAgencyApp')
    .config(config);

}) ();
