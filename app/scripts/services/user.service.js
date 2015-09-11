(function () {
  'use strict';


  function UserService($location, $http, $cookieStore, $rootScope, $timeout, config,md5) {
    var webServiceRootUrl = config.urlHTTP + $location.host() + config.userUrl;
    var webservideSearchUrl = webServiceRootUrl + "count";
    var webservidePatchUrl = webServiceRootUrl;
    var webservidePatchSelfUrl = config.urlHTTP + $location.host() +config.restPort + "change_own_password";

      function getCount(userName, callback) {
      /* Dummy authentication for testing, uses $timeout to simulate api call
       ----------------------------------------------*/
      $timeout(function () {

        $http({
          url: webservideSearchUrl,
          method: "GET",
          params: {"userName": userName}
        }).then(function (data) {
          var result = data.data.result;
          //console.log(data.data.result);
          callback(result);
        });
      }, 1000);
    }

    function setPasswordByAdmin(id,password, callback) {
      var params={
        'password': md5.createHash(password)
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

    function setPasswordBySelf(username,password, callback) {
      var params={
        'userName':username,
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
    service.getCount = getCount;
    service.setPasswordByAdmin = setPasswordByAdmin;
    service.setPasswordBySelf = setPasswordBySelf;
    return service;

  }

  UserService.$inject = ['$location', '$http', '$cookieStore', '$rootScope', '$timeout', 'config','md5'];

  angular
    .module('angularApp')
    .factory('UserService', UserService);


})();
