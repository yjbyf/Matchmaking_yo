'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
var myApp = angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

  myApp.config(function ($routeProvider) {
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
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/browse'
      });
  })  ;


