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
    'angular-md5',
    'ui.bootstrap.datetimepicker',
    'ui.select',
    'angular-loading-bar',
    'smart-table',
    'propsFilter',//自定义过滤器
    'dateFilter'
  ]);


//config.$inject = ['$routeProvider'];
function config($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .when('/changePassword', {
      templateUrl: 'views/changePassword.html',
      controller: 'changePasswordCtrl',
      controllerAs: 'changePassword'
    })
    .when('/person', {
      templateUrl: 'views/person.html',
      controller: 'PersonCtrl',
      controllerAs: 'person'
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
    .when('/employee', {
      templateUrl: 'views/employee.html',
      controller: 'EmployeeCtrl',
      controllerAs: 'employee'
    })
    .when('/contract', {
      templateUrl: 'views/contract.html',
      controller: 'ContractCtrl',
      controllerAs: 'contract'
    })
    .otherwise({
      redirectTo: '/person'
    });
}

myApp.config(config);

myApp.constant('config', {
  admin : "admin",
  noPrivUrl:"open/",
  restUrl:"rest/",
  restPort:':8080/',
  urlHTTP:'http://',
  failed:'failed'
});

function run($rootScope, $location, $cookieStore, $http) {
  // keep user logged in after page refresh
  //console.log("app run"+$rootScope.globals);
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] =  $rootScope.globals.currentUser.securityCode;// jshint ignore:line
    //.userName+","+ $rootScope.globals.currentUser.password; // jshint ignore:line
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


