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
  $scope.visible = false;

  $scope.isActive = function (viewLocation) {
    //console.log($location.path());
    //console.log("login or not:"+$rootScope.authenticated);
    $scope.visible = AuthenticationService.getMenuVisible();

    if (!$scope.visible) {
      $location.path("/login");
    }
    return viewLocation === $location.path();
  };

  $scope.logout = function(){
    AuthenticationService.ClearCredentials();
    $scope.visible = AuthenticationService.getMenuVisible();
    $location.path("/login");
    //console.log("do logout");
  };
}

MenuCtrl.$inject = ['$rootScope', '$scope', '$location', 'AuthenticationService'];

angular.module('angularApp')
  .controller('MenuCtrl', MenuCtrl);
