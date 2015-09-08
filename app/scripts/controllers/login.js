'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LoginCtrl', function ($scope,$rootScope,$location) {
    $scope.doLogin = function(){
      $rootScope.authenticated=true;
      $location.path("/browse");
    }
  });
