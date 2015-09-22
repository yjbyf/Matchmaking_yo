'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:PersonCtrl
 * @description
 * # PersonCtrl
 * Controller of the angularApp
 */
function MatchCtrl($scope, PersonService, $filter, UserService, AuthenticationService, ContractService,MatchService) {
  $scope.showAddButton = !AuthenticationService.getAdminMenuVisible();
  //以下三行必须初始化，否则ui select选择的值无法传递给以下的变量
  $scope.person = {};
  $scope.serviceEmployee = {};
  $scope.matchPerson = {};

  $scope.refresh = function () {
    //刷新配对grid
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
    //合同数据获取
    ContractService.getContractList(function (data) {
      if (data.data === undefined) {
        return false;
      }
      $scope.persons = data.data;
      for (var i = 0; i < $scope.persons.length; i++) {
        var person = $scope.persons[i];
        person.id = person.pk;
      }
    });
    //老师数据获取
    UserService.getUserListWithoutPriv(function (data) {
      $scope.serviceEmployees = data.data;
    });
  });
  //tab点击
  $scope.tabClick = function (tabTitle) {
    $scope.tabTitle = tabTitle;
  };
  //选择日期后格式化
  $scope.onMatchDateSet = function (newDate) {
    $scope.selectedMatch.matchDate = $filter('date')(newDate, 'yyyy-MM-dd');
  };
  //配对日期未选择，则配对人不能选择
  $scope.getMatchNameDisable = function () {
    if ($scope.selectedMatch === undefined || $scope.selectedMatch.matchDate === undefined) {
      return true;
    }
    return !$scope.selectedMatch.matchDate;
  };

  //配对人未选择，则配对对象不能选择
  $scope.getMatchObjectDisable = function () {
    if ($scope.person === undefined || $scope.person.selected === undefined) {
      return true;
    }
    return !$scope.person.selected;
  };
  //点击新增后，展开空白编辑区域
  $scope.newRecord = function () {
    $scope.selectedMatch = undefined;
    $scope.serviceEmployee = undefined;
    $scope.matchPerson = undefined;
    $scope.btnSaveClicked = false;
    //$('#personModal').modal();
    $('#tabs a:last').tab('show');//tab选择显示
    $scope.tabClick('edit'); //tab下的内容显示
  };

  //新增和修改保存
  $scope.doSave = function (formValid) {
    //console.log(formValid);
    $scope.btnSaveClicked = true;
    if (!formValid) {
      return false;
    }
    $scope.selectedMatch.nameId = $scope.person.selected.personId; //取值来源合同上的人员id//姓名
    $scope.selectedMatch.nameContractId = $scope.person.selected.id; //合同id
    $scope.selectedMatch.serviceEmployeeId = $scope.serviceEmployee.selected.id; //服务老师
    //console.log($scope.matchPerson.selected);
    $scope.selectedMatch.matchPersonId = $scope.matchPerson.selected.personId; //取值来源合同上的人员id//配对对象
    $scope.selectedMatch.matchPersonContractId = $scope.matchPerson.selected.id; //合同id

    if ($scope.selectedMatch.id === undefined) {
      $scope.selectedMatch.aliveFlag = '1';
      //console.log($scope.selectedMatch);
      MatchService.newMatch($scope.selectedMatch, function () {
        $scope.btnSaveClicked = false;
        //console.log("done add" + response);
        //refresh grid
        $scope.refresh();
      });
    } else {
      //alert("start mod");
      MatchService.saveMatch($scope.selectedMatch, function () {
        $('#personModal').modal('toggle');
        //console.log("done add" + response);
        //refresh grid
        $scope.refresh();
      });
    }
  };


///////////////////////////////////////////////////////////////////
  //todo delete the following code


  $scope.addMatch = function (person) {
    var myObject = JSON.parse(person);
    $scope.selectedMatch = myObject;
    $scope.btnSaveClicked = false;
    $('#personModal').modal();
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


}

MatchCtrl.$inject = ['$scope', 'PersonService', '$filter', 'UserService', 'AuthenticationService', 'ContractService','MatchService'];

angular.module('angularApp')
  .controller('MatchCtrl', MatchCtrl);
