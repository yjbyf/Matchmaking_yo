(function () {
  'use strict';


  function EmployeeService($location, $http, $cookieStore, $rootScope, $timeout, config,HostService) {
    var webServiceRootUrl = config.urlHTTP + HostService.getHost() + config.restPort + "employee/";

    function getEmployeeList(callback) {
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

    function newEmployee(employee,callback) {
      $timeout(function () {
        $http({
          url: webServiceRootUrl,
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data:employee
      }).
          then(function (response) {
            callback(response);
          }, function (response) {
            console.log("add error" + response);
          });
      }, 1000);
    }

    function saveEmployee(employee,callback){
      $timeout(function () {
        //alert(webServiceRootUrl+Employee.id);
        //alert(Employee);
        $http.patch(
          webServiceRootUrl+employee.id,
          employee
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

    function deleteEmployee(idToBeDeleted,callback){
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
    service.getEmployeeList = getEmployeeList;
    service.newEmployee = newEmployee;
    service.saveEmployee = saveEmployee;
    service.deleteEmployee = deleteEmployee;
    return service;
  }

  EmployeeService.$inject = ['$location', '$http', '$cookieStore', '$rootScope', '$timeout', 'config','HostService'];

  angular
    .module('angularApp')
    .factory('EmployeeService', EmployeeService);


})();
