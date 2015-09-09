'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LoginCtrl', function ($scope,$rootScope,$location,$cookieStore,$http) {
    $scope.doLogin = function(valid){
      if(!valid){
        return false;
      }
      //TODO CALL THE REST TO VERIY THE LOGIN
      $rootScope.authenticated=true;
      $rootScope.globals = {
        currentUser: {
          username: "aaa",
          authdata: "bbb"
        }
      };
      $http.defaults.headers.common['Authorization'] = "aa"; // jshint ignore:line
      $cookieStore.put('globals', $rootScope.globals);
      $location.path("/browse");
    };
  });
