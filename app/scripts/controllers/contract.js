'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:ContractCtrl
 * @description
 * # ContractCtrl
 * Controller of the angularApp
 */
function ContractCtrl($scope, ContractService,PersonService,$filter,UserService) {
  $scope.person = {};
  $scope.checker = {};
  $scope.refresh = function () {
    ContractService.getContractList(function (data) {
      //console.log("contract get:"+data);
      $scope.contracts = data.data._embedded.contract;
      for (var i = 0; i < $scope.contracts.length; i++) {
        var contract = $scope.contracts[i];
        //var href = contract._links.self.href;
        //var id = href.substr(href.lastIndexOf("/") + 1);
        //console.log(id);
        contract.id = contract.pk;
      }

     //console.log($scope.contracts);
      //console.log("contract get:"+data);
    });
  };

  $scope.init = function(){
    PersonService.getPersonList(function(data){
      $scope.persons = data.data._embedded.person;
      for (var i = 0; i < $scope.persons.length; i++) {
        var person = $scope.persons[i];
        //var href = contract._links.self.href;
        //var id = href.substr(href.lastIndexOf("/") + 1);
        //console.log(id);
        person.id = person.pk;
      }
      //$scope.people = $scope.persons;
      //console.log("contract get:"+data);
    });
    UserService.getUserListWithoutPriv(function(data){
      $scope.checkers = data.data;
    });
  };
  $(document).ready(function() {

    $scope.init();
    $scope.refresh();
  });



  $scope.newRecord = function () {
    $scope.selectedContract = null;
    $scope.btnSaveClicked = false;
    $scope.person.selected =  undefined;
    $scope.checker.selected = undefined;
    //$('#form')[0].reset();
    $('#contractModal').modal();

  };

  $scope.modRecord = function (contract) {
    //$('#form')[0].reset();
    var myObject = JSON.parse(contract);
    $scope.selectedContract = myObject;
    $scope.person.selected = $scope.selectedContract.personInfo ;
    $scope.checker.selected = $scope.selectedContract.checkerInfo;
    //console.log($scope.selectedContract.personId);
    $scope.btnSaveClicked = false;
    $('#contractModal').modal();
  };

  $scope.doSave = function (formValid) {
    //console.log(formValid);
    $scope.btnSaveClicked = true;
    if(!formValid) {
      return false;
    }
    $scope.selectedContract.personInfo = $scope.person.selected;
    $scope.selectedContract.checkerInfo = $scope.checker.selected;
    //console.log($scope.selectedContract);
    if ($scope.selectedContract.id === undefined) {
      $scope.selectedContract.aliveFlag = '1';
      //console.log($scope.selectedContract);
      ContractService.newContract($scope.selectedContract, function () {
        $('#contractModal').modal('toggle');
        //console.log("done add" + response);
        //refresh grid
        $scope.refresh();
      });
    } else {
      //alert("start mod");
      ContractService.saveContract($scope.selectedContract, function () {
        $('#contractModal').modal('toggle');
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
    for(var i=0;i<$scope.selectionContracts.length;i++){
      var contract = $scope.selectionContracts[i];
      contract.aliveFlag = '0';
      ContractService.saveContract(contract,$scope.refresh);
    }

  };

  // selected ids
  $scope.selectionIds = [];
  $scope.selectionContracts = [];

  // toggle selection for checkbox
  $scope.toggleSelection = function toggleSelection(contract) {
    var idx = $scope.selectionIds.indexOf(contract.id);
    // is currently selected
    if (idx > -1) {
      $scope.selectionIds.splice(idx, 1);
      $scope.selectionContracts.splice(idx, 1);
    }
    // is newly selected
    else {
      $scope.selectionIds.push(contract.id);
      $scope.selectionContracts.push(contract);
    }
  };

  $scope.onStartDateSet = function (newDate) {
    $scope.selectedContract.startDate = $filter('date')(newDate, 'yyyy-MM-dd');
  };

  $scope.onEndDateSet = function (newDate) {
    $scope.selectedContract.endDate = $filter('date')(newDate, 'yyyy-MM-dd');
  };
}

ContractCtrl.$inject = ['$scope', 'ContractService','PersonService', '$filter','UserService'];

angular.module('angularApp')
  .controller('ContractCtrl', ContractCtrl);
