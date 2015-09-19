(function () {
  'use strict';


  function PersonService($location, $http, $cookieStore, $rootScope, $timeout, config, HostService) {
    var webServiceRootUrl = config.urlHTTP + HostService.getHost() + config.restPort + config.restUrl + "person/";

    function getPersonList(callback) {
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

    function findPerson(persons,personId){
      var i;
      for(i=0;i<persons.length;i++){
        if(persons[i].id===personId){
          return persons[i];
        }
      }
      return undefined;
    }

    function newPerson(person, callback) {
      person.createdBy = $rootScope.globals.currentUser.id;
      $timeout(function () {
        $http({
          url: webServiceRootUrl,
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data: person
          /*data: {
           'name': person.name,
           'gender': person.gender,
           'birthDate':person.birthDate
           }*/
        }).
          then(function (response) {
            callback(response);
          }, function (response) {
            console.log("add error" + response);
          });
      }, 1000);
    }

    function savePerson(person, callback) {
      $timeout(function () {
        //alert(webServiceRootUrl+person.id);
        //alert(person);
        $http.patch(
          webServiceRootUrl + person.id,
          person
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

    function deletePerson(idToBeDeleted, callback) {
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
    service.getPersonList = getPersonList;
    service.newPerson = newPerson;
    service.savePerson = savePerson;
    service.deletePerson = deletePerson;
    service.findPerson = findPerson;
    return service;
  }

  PersonService.$inject = ['$location', '$http', '$cookieStore', '$rootScope', '$timeout', 'config', 'HostService'];

  angular
    .module('angularApp')
    .factory('PersonService', PersonService);


})();
