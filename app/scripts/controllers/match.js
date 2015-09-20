'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:PersonCtrl
 * @description
 * # PersonCtrl
 * Controller of the angularApp
 */
function MatchCtrl($scope, PersonService, $filter,UserService,AuthenticationService,ContractService) {
  $scope.showAddButton = !AuthenticationService.getAdminMenuVisible();
  $scope.person = {};
  $scope.serviceEmployee = {};
  $scope.refresh = function () {
    PersonService.getPersonList(function (data) {
      //console.log("person get:"+data);
      if (data.data === undefined) {
        return false;
      }
      $scope.persons = data.data;
      for (var i = 0; i < $scope.persons.length; i++) {
        var person = $scope.persons[i];
        person.id = person.pk;
      }
      $scope.displayedCollection = [].concat($scope.persons);
    });
  };

  $(document).ready(function () {
    $('#tabs').tab();
    $scope.tabTitle = 'grid';
    $scope.refresh();
    ContractService.getContractList(function(data){
      if(data.data===undefined){
        return false;
      }
      $scope.persons = data.data;
      for (var i = 0; i < $scope.persons.length; i++) {
        var person = $scope.persons[i];
        person.id = person.pk;
      }
    });
    UserService.getUserListWithoutPriv(function(data){
      $scope.serviceEmployees = data.data;
    });
  });

  $scope.tabClick = function (tabTitle) {
    $scope.tabTitle = tabTitle;
  };

  $scope.onMatchDateeSet = function (newDate) {
    $scope.selectedMatch.matchDate = $filter('date')(newDate, 'yyyy-MM-dd');
  };

  $scope.addMatch = function (person) {
    var myObject = JSON.parse(person);
    $scope.selectedPerson = myObject;
    $scope.btnSaveClicked = false;
    $('#personModal').modal();
  };
///////////////////////////////////////////////////////////////////
  //todo delete the following code
  $scope.newRecord = function () {
    $scope.selectedPerson = null;
    $scope.btnSaveClicked = false;
    $('#personModal').modal();
  };

  $scope.doSave = function (formValid) {
    //console.log(formValid);
    $scope.btnSaveClicked = true;
    if (!formValid) {
      return false;
    }
    if ($scope.selectedPerson.id === undefined) {
      $scope.selectedPerson.aliveFlag = '1';
      //console.log($scope.selectedPerson);
      PersonService.newPerson($scope.selectedPerson, function () {
        $('#personModal').modal('toggle');
        //console.log("done add" + response);
        //refresh grid
        $scope.refresh();
      });
    } else {
      //alert("start mod");
      PersonService.savePerson($scope.selectedPerson, function () {
        $('#personModal').modal('toggle');
        //console.log("done add" + response);
        //refresh grid
        $scope.refresh();
      });
    }
  };

  $scope.doDelete = function () {
    //console.log($scope.selection);
    //TODO 优化为批量删除，或者等全部删除后再刷新
    for (var i = 0; i < $scope.selectionPersons.length; i++) {
      var person = $scope.selectionPersons[i];
      person.aliveFlag = '0';
      PersonService.savePerson(person, $scope.refresh);
    }
  };

  // selected ids
  $scope.selectionIds = [];
  $scope.selectionPersons = [];

  // toggle selection for a given fruit by name
  $scope.toggleSelection = function toggleSelection(person) {
    var idx = $scope.selectionIds.indexOf(person.id);
    // is currently selected
    if (idx > -1) {
      $scope.selectionIds.splice(idx, 1);
      $scope.selectionPersons.splice(idx, 1);
    }
    // is newly selected
    else {
      $scope.selectionIds.push(person.id);
      $scope.selectionPersons.push(person);
    }
  };

  $scope.onTimeSet = function (newDate) {
    $scope.selectedPerson.birthDate = $filter('date')(newDate, 'yyyy-MM');
  };

}

MatchCtrl.$inject = ['$scope', 'PersonService', '$filter','UserService','AuthenticationService','ContractService'];

angular.module('angularApp')
  .controller('MatchCtrl', MatchCtrl);
