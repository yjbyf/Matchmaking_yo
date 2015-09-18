'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */


function changePasswordCtrl($scope, $rootScope, $location, $cookieStore, $http, config, md5, AuthenticationService, FlashService,UserService) {

  $scope.doChange = function (valid) {
    if (!valid) {
      return false;
    }
    if (md5.createHash($scope.oldPassword) !== $rootScope.globals.currentUser.password) {
      FlashService.Error("老密码不正确");
      return false;
    }

    if ($scope.newPassword !== $scope.newPasswordConfirm) {
      FlashService.Error("新密码两次录入不一致");
      return false;
    }

    UserService.setPasswordBySelf(AuthenticationService.getName(),$scope.newPassword, function(){
      $rootScope.globals.currentUser.password=md5.createHash($scope.newPassword);
      FlashService.Success("修改成功");
    });
  };
}

changePasswordCtrl.$inject = ['$scope', '$rootScope', '$location', '$cookieStore', '$http', 'config', 'md5', 'AuthenticationService', 'FlashService','UserService','HostService'];

angular.module('angularApp')
  .controller('changePasswordCtrl', changePasswordCtrl);


