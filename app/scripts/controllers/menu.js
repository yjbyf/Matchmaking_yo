'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MenuCtrl', function ($rootScope, $scope, $location) {


    $scope.isActive = function (viewLocation) {
      //console.log($location.path());
      //console.log("login or not:"+$rootScope.authenticated);
      $scope.visible = $rootScope.authenticated;
      //TODO 登录后$rootScope.authenticated =true
      if (!$rootScope.authenticated) {
        $location.path("/login");
      }
      return viewLocation === $location.path();
    };
  });
