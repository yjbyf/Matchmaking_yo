'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */

function LoginCtrl($scope,$rootScope,$location,$cookieStore,$http, config,md5,AuthenticationService,FlashService ) {

  $scope.webServiceLginUrl = config.urlHTTP + $location.host() + config.validLoginUul;
  $scope.doLogin = function (valid) {
    if (!valid) {
      return false;
    }

    //TODO CALL THE REST TO VERIY THE LOGIN
    var md5Password = md5.createHash($scope.password);
    AuthenticationService.Login($scope.userName,md5Password,function(result){
      if(result!=="failed"){
        AuthenticationService.SetCredentials($scope.userName,md5Password,result);
        $location.path("/browse");
      }else{
        FlashService.Error("登录失败");
      }
    });

  };
}
  LoginCtrl.$inject = ['$scope', '$rootScope', '$location', '$cookieStore', '$http', 'config','md5', 'AuthenticationService', 'FlashService'];
  angular.module('angularApp')
    .controller('LoginCtrl', LoginCtrl);


