'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl',
        controllerAs: 'browse'
      })
      .when('/match', {
        templateUrl: 'views/match.html',
        controller: 'MatchCtrl',
        controllerAs: 'match'
      })
      .otherwise({
        redirectTo: '/browse'
      });
  })
  ;
