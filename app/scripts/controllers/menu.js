'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */

function MenuCtrl ($rootScope, $scope, $location,AuthenticationService)
{
  $scope.menuVisible = false;
  $scope.adminMenuVisible = false;

  $scope.isActive = function (viewLocation) {
    //console.log($location.path());
    //console.log("login or not:"+$rootScope.authenticated);
    $scope.menuVisible = AuthenticationService.getMenuVisible();
    $scope.adminMenuVisible = AuthenticationService.getAdminMenuVisible();
    if (!$scope.menuVisible) {
      $location.path("/login");
    }
    return viewLocation === $location.path();
  };

  $scope.logout = function(){
    AuthenticationService.ClearCredentials();
    $scope.menuVisible = AuthenticationService.getMenuVisible();
    $scope.adminMenuVisible =  AuthenticationService.getAdminMenuVisible();
    $location.path("/login");
    //console.log("do logout");
  };
}

MenuCtrl.$inject = ['$rootScope', '$scope', '$location', 'AuthenticationService'];

angular.module('angularApp')
  .controller('MenuCtrl', MenuCtrl);
