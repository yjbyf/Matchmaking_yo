(function () {
  'use strict';


  function MatchService($location, $http, $cookieStore, $rootScope, $timeout, config, HostService) {
    var webServiceRootUrl = config.urlHTTP + HostService.getHost() + config.restPort + config.restUrl + "match/";
    var webServiceNewUrl = webServiceRootUrl + "new/";

    function getMatchList(callback) {
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

    function newMatch(match, callback) {
      match.createdBy = $rootScope.globals.currentUser.id;
      $timeout(function () {
        $http({
          url: webServiceNewUrl,
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data: match
          /*data: {
           'name': match.name,
           'gender': match.gender,
           'birthDate':match.birthDate
           }*/
        }).
          then(function (response) {
            callback(response);
          }, function (response) {
            console.log("add error" + response);
          });
      }, 1000);
    }

    function saveMatch(match, callback) {
      $timeout(function () {
        //alert(webServiceRootUrl+match.id);
        //alert(match);
        $http.patch(
          webServiceRootUrl + match.id,
          match
        ).then(function () {
            callback();
            // this callback will be called asynchronously
            // when the response is available
          }, function (response) {
            console.log("save error" + response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }, 1000);
    }

    function deleteMatch(idToBeDeleted, callback) {
      $timeout(function () {
        $http.delete(webServiceRootUrl + idToBeDeleted).then(function () {
          //console.log("done delete" + response);
          //refresh grid
          callback();
          // this callback will be called asynchronously
          // when the response is available
        }, function (response) {
          console.log("delete error" + response);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }, 1000);
    }

    var service = {};
    service.getMatchList = getMatchList;
    service.newMatch = newMatch;
    service.saveMatch = saveMatch;
    service.deleteMatch = deleteMatch;
    return service;
  }

  MatchService.$inject = ['$location', '$http', '$cookieStore', '$rootScope', '$timeout', 'config', 'HostService'];

  angular
    .module('angularApp')
    .factory('MatchService', MatchService);


})();
