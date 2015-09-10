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
    'ngTouch',
    'angular-md5'
  ]);


//config.$inject = ['$routeProvider'];
function config($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
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
      redirectTo: '/login'
    });
}

myApp.config(config);

myApp.constant('config', {
  userUrl :':8080/user/',
  urlHTTP:'http://',
  validLoginUul : ':8080/loginValid/'
});

function run($rootScope, $location, $cookieStore, $http) {
  // keep user logged in after page refresh
  //console.log("app run"+$rootScope.globals);
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] =  $rootScope.globals.currentUser.userName+ $rootScope.globals.currentUser.password; // jshint ignore:line
  }

  //$rootScope.$on('$locationChangeStart', function (event, next, current) {
  $rootScope.$on('$locationChangeStart', function (event, next, current) { // jshint ignore:line
    // redirect to login page if not logged in and trying to access a restricted page
    var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
    var loggedIn = $rootScope.globals.currentUser;
    if (restrictedPage && !loggedIn) {
      $location.path('/login');
    }
  });
}

myApp.run(run);


