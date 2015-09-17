﻿(function () {
  'use strict';


  function UserService($location, $http, $cookieStore, $rootScope, $timeout, config, md5, HostService) {
    var webServiceRootUrl = config.urlHTTP + HostService.getHost() + config.userUrl;
    var webservideSearchUrl = webServiceRootUrl + "count";
    var webservidePatchUrl = webServiceRootUrl;
    var webservidePatchSelfUrl = config.urlHTTP + HostService.getHost() + config.restPort + "change_own_password";
    var webServiceUserNoPrivUrl = config.urlHTTP + HostService.getHost() + config.restPort + "userListNoPriv";

    function getUserList(callback) {
      /* Dummy authentication for testing, uses $timeout to simulate api call
       ----------------------------------------------*/
      $timeout(function () {
        $http({
          url: webServiceRootUrl,
          method: "GET",
          params: {}
        }).then(function (data) {
          //var result = data.data.result;
          //console.log(data.data.result);
          callback(data);
        });
      }, 1000);
    }

    function getUserListWithoutPriv(callback) {
      /* Dummy authentication for testing, uses $timeout to simulate api call
       ----------------------------------------------*/
      $timeout(function () {
        $http({
          url: webServiceUserNoPrivUrl,
          method: "GET",
          params: {}
        }).then(function (data) {
          //var result = data.data.result;
          //console.log(data.data.result);
          callback(data);
        });
      }, 1000);
    }

    function getCount(userName, callback) {
      /* Dummy authentication for testing, uses $timeout to simulate api call
       ----------------------------------------------*/
      $timeout(function () {

        $http({
          url: webservideSearchUrl,
          method: "GET",
          params: {
            "userName": userName,
            "aliveFlag": "1"
          }
        }).then(function (data) {
          var result = data.data.result;
          //console.log(data.data.result);
          callback(result);
        });
      }, 1000);
    }

    function setRecordByAdmin(user, callback) {
      var id = user.id;
      var password = user.password;
      var params = {
        'password': md5.createHash(password),
        'staff': user.staff,
        'aliveFlag': user.aliveFlag
      };
      $timeout(function () {
        $http.patch(
          webservidePatchUrl + id,
          params
        ).then(function () {
            callback();
            // this callback will be called asynchronously
            // when the response is available
          }, function (response) {
            console.log("mod error" + response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }, 1000);
    }

    function setPasswordBySelf(username, password, callback) {
      var params = {
        'userName': username,
        'password': md5.createHash(password)
      };
      $timeout(function () {
        $http.post(
          webservidePatchSelfUrl,
          params
        ).then(function () {
            callback();
            // this callback will be called asynchronously
            // when the response is available
          }, function (response) {
            console.log("mod error" + response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }, 1000);
    }


    var service = {};
    service.getUserList = getUserList;
    service.getUserListWithoutPriv = getUserListWithoutPriv;
    service.getCount = getCount;
    service.setRecordByAdmin = setRecordByAdmin;
    service.setPasswordBySelf = setPasswordBySelf;
    return service;

  }

  UserService.$inject = ['$location', '$http', '$cookieStore', '$rootScope', '$timeout', 'config', 'md5', 'HostService'];

  angular
    .module('angularApp')
    .factory('UserService', UserService);


})();
