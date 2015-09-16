'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the angularApp
 */
function EmployeeCtrl($scope, EmployeeService) {

  $scope.refresh = function () {
    EmployeeService.getEmployeeList(function (data) {
      //console.log("employee get:"+data);
      $scope.employees = data.data._embedded.employee;
      for (var i = 0; i < $scope.employees.length; i++) {
        var employee = $scope.employees[i];
        //var href = employee._links.self.href;
        //var id = href.substr(href.lastIndexOf("/") + 1);
        //console.log(id);
        employee.id = employee.pk;
      }
      //console.log("employee get:"+data);
    });
  };
  $scope.refresh();


  $scope.newRecord = function () {
    $scope.selectedEmployee = null;
    $scope.btnSaveClicked = false;
    $('#employeeModal').modal();
  };

  $scope.modRecord = function (employee) {
    var myObject = JSON.parse(employee);
    $scope.selectedEmployee = myObject;
    $scope.btnSaveClicked = false;
    $('#employeeModal').modal();
  };

  $scope.doSave = function (formValid) {
    //console.log(formValid);
    $scope.btnSaveClicked = true;
    if(!formValid) {
      return false;
    }
    if ($scope.selectedEmployee.id === undefined) {
      $scope.selectedEmployee.aliveFlag = '1';
      //console.log($scope.selectedEmployee);
      EmployeeService.newEmployee($scope.selectedEmployee, function () {
        $('#employeeModal').modal('toggle');
        //console.log("done add" + response);
        //refresh grid
        $scope.refresh();
      });
    } else {
      //alert("start mod");
      EmployeeService.saveEmployee($scope.selectedEmployee, function () {
        $('#employeeModal').modal('toggle');
        //console.log("done add" + response);
        //refresh grid
        $scope.refresh();
      });
    }
  };

  $scope.doDelete = function () {
    //console.log($scope.selection);
    //TODO 优化为批量删除，或者等全部删除后再刷新
    //todo 需要加入确认框
    for(var i=0;i<$scope.selectionEmployees.length;i++){
      var employee = $scope.selectionEmployees[i];
      employee.aliveFlag = '0';
      EmployeeService.saveEmployee(employee,$scope.refresh);
    }

  };

  // selected ids
  $scope.selectionIds = [];
  $scope.selectionEmployees = [];

  // toggle selection for checkbox
  $scope.toggleSelection = function toggleSelection(employee) {
    var idx = $scope.selectionIds.indexOf(employee.id);
    // is currently selected
    if (idx > -1) {
      $scope.selectionIds.splice(idx, 1);
      $scope.selectionEmployees.splice(idx, 1);
    }
    // is newly selected
    else {
      $scope.selectionIds.push(employee.id);
      $scope.selectionEmployees.push(employee);
    }
  };
}

EmployeeCtrl.$inject = ['$scope', 'EmployeeService', '$filter'];

angular.module('angularApp')
  .controller('EmployeeCtrl', EmployeeCtrl);
