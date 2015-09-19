(function () {
  'use strict';


  function UserService($location, $http, $cookieStore, $rootScope, $timeout, config, md5, HostService) {
    var webServiceRootUrl = config.urlHTTP + HostService.getHost() + config.restPort + config.restUrl+ 'user/';
    var webservideSearchUrl = webServiceRootUrl + "count";
    var webservidePatchUrl = webServiceRootUrl;
    var webservidePatchSelfUrl = config.urlHTTP + HostService.getHost() + config.restPort + config.noPrivUrl + "change_own_password";
    var webServiceUserNoPrivUrl = config.urlHTTP + HostService.getHost() + config.restPort + config.noPrivUrl +"userListNoPriv";

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

    function findUser(users,userId){
      var i;
      for(i=0;i<users.length;i++){
        if(users[i].id===userId){
          return users[i];
        }
      }
      return undefined;
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

    function insertRecord(user,callback) {
      $timeout(function () {
        $http({
          url: webServiceRootUrl,
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            'userName': user.userName,
            'staff': user.staff,
            'password': md5.createHash(user.password),
            'aliveFlag': '1'
          }
        }).
          then(function () {
            callback();
          }, function (response) {
            console.log("add error" + response);
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
    service.insertRecord = insertRecord;
    service.findUser = findUser;
    return service;

  }

  UserService.$inject = ['$location', '$http', '$cookieStore', '$rootScope', '$timeout', 'config', 'md5', 'HostService'];

  angular
    .module('angularApp')
    .factory('UserService', UserService);


})();
