(function () {
  'use strict';


  function ContractService($location, $http, $cookieStore, $rootScope, $timeout, config,HostService) {
    var webServiceRootUrl = config.urlHTTP + HostService.getHost() + config.restPort + config.restUrl + "contract/";
    var webServiceSavedUrl = webServiceRootUrl + "save/";

    function getContractList(callback) {
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

    function newContract(contract,callback) {
      contract.createdBy = $rootScope.globals.currentUser.id;
      $timeout(function () {
        $http({
          url: webServiceSavedUrl,
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data:contract
      }).
          then(function (response) {
            callback(response);
          }, function (response) {
            console.log("add error" + response);
          });
      }, 1000);
    }

    function saveContract(contract,callback){
      $timeout(function () {
        //alert(webServiceRootUrl+Contract.id);
        //alert(Contract);
        $http.patch(
          webServiceSavedUrl,//+contract.id,
          contract
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

    function deleteContract(idToBeDeleted,callback){
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
    service.getContractList = getContractList;
    service.newContract = newContract;
    service.saveContract = saveContract;
    service.deleteContract = deleteContract;
    return service;
  }

  ContractService.$inject = ['$location', '$http', '$cookieStore', '$rootScope', '$timeout', 'config','HostService'];

  angular
    .module('angularApp')
    .factory('ContractService', ContractService);


})();
