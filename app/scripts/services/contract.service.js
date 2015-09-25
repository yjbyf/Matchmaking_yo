(function () {
  'use strict';


  function ContractService($location, $http, $cookieStore, $rootScope, $timeout, config,HostService) {
    var webServiceRootUrl = config.urlHTTP + HostService.getHost() + config.restPort + config.restUrl + "contract/";
    var webServiceNewUrl = webServiceRootUrl + "new/";
    var webServiceSaveUrl = webServiceRootUrl + "mod/";
    var webServiceDelUrl = webServiceRootUrl + "del/";
    var webServiceValidUrl = webServiceRootUrl + "valid/";

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

    function findContract(contracts,contractId){
      var i;
      for(i=0;i<contracts.length;i++){
        if(contracts[i].id===contractId){
          return contracts[i];
        }
      }
      return undefined;
    }

    function validContract(contract,callback){
      $timeout(function () {
        $http({
          url: webServiceValidUrl,
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data:contract
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
          url: webServiceNewUrl,
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
        $http.post(
          webServiceSaveUrl,//+contract.id,
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

    function deleteContract(contract,callback){
      $timeout(function () {
        $http.post(
          webServiceDelUrl,//+contract.id,
          contract
        ).then(function () {
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
    service.validContract = validContract;
    service.findContract = findContract;
    return service;
  }

  ContractService.$inject = ['$location', '$http', '$cookieStore', '$rootScope', '$timeout', 'config','HostService'];

  angular
    .module('angularApp')
    .factory('ContractService', ContractService);


})();
