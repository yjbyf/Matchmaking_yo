'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:PersonCtrl
 * @description
 * # PersonCtrl
 * Controller of the angularApp
 */
function MatchCtrl($scope, PersonService, $filter, UserService, AuthenticationService, ContractService, MatchService) {
  $scope.showAddButton = !AuthenticationService.getAdminMenuVisible();
  //以下三行必须初始化，否则ui select选择的值无法传递给以下的变量
  $scope.person = {};
  $scope.serviceEmployee = {};
  $scope.matchPerson = {};

  $scope.refresh = function () {
    //刷新配对grid
    MatchService.getMatchList(function (data) {
      //console.log("person get:"+data);
      if (data.data === undefined) {
        return false;
      }
      $scope.matches = data.data;


      $scope.displayedCollection = [].concat($scope.matches);//用于表格的表头排序
    });

    //合同数据获取
    ContractService.getContractList(function (data) {
      if (data.data === undefined) {
        return false;
      }
      $scope.persons = data.data;

    });
  };

  $(document).ready(function () {
    $('#tabs').tab();
    $scope.tabTitle = 'grid';
    $scope.refresh();

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
    $scope.selectedMatch = undefined;//整个数据对象
    $scope.person.selected =  undefined;
    $scope.serviceEmployee.selected = undefined;
    $scope.matchPerson.selected = undefined;
    $scope.btnSaveClicked = false;
    //$('#personModal').modal();
    $('#tabs a:last').tab('show');//tab选择显示
    $scope.tabClick('edit'); //tab下的内容显示
  };
//点击修改，编辑区域填满原有内容
  $scope.modRecord = function (match) {
    //$('#form')[0].reset();
    var json = JSON.parse(match);
    $scope.selectedMatch = json;
    var personInfo = ContractService.findContract($scope.persons, json.nameContract); //refNameId在match.java中定义
    //console.log(json);
    $scope.person.selected = personInfo;
    var objectInfo = ContractService.findContract($scope.persons, json.matchPersonContract);
    $scope.matchPerson.selected = objectInfo;
    var serviceInfo = UserService.findUser($scope.serviceEmployees, json.serviceEmployee);
    $scope.serviceEmployee.selected = serviceInfo;
    $scope.btnSaveClicked = false;
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
    $scope.selectedMatch.nameId = $scope.person.selected.person; //取值来源合同上的人员id//姓名
    $scope.selectedMatch.nameContractId = $scope.person.selected.id; //合同id
    $scope.selectedMatch.serviceEmployeeId = $scope.serviceEmployee.selected.id; //服务老师
    //console.log($scope.matchPerson.selected);
    $scope.selectedMatch.matchPersonId = $scope.matchPerson.selected.person; //取值来源合同上的人员id//配对对象
    $scope.selectedMatch.matchPersonContractId = $scope.matchPerson.selected.id; //合同id

    if ($scope.selectedMatch.id === undefined) {
      $scope.selectedMatch.aliveFlag = '1';
      //console.log($scope.selectedMatch);
      MatchService.newMatch($scope.selectedMatch, function () {
        //$scope.btnSaveClicked = false;
        //console.log("done add" + response);
        //refresh grid
        $('#tabs a:first').tab('show');//tab选择显示
        $scope.tabClick('grid'); //tab下的内容显示
        $scope.refresh();
      });
    } else {
      //alert("start mod");
      MatchService.saveMatch($scope.selectedMatch, function () {
        //$scope.btnSaveClicked = false;
        //console.log("done add" + response);
        //refresh grid
        $('#tabs a:first').tab('show');//tab选择显示
        $scope.tabClick('grid'); //tab下的内容显示
        $scope.refresh();
      });
    }
  };

// selected ids
  $scope.selectionIds = [];
  $scope.selectionMatches = [];

  // toggle selection for a given fruit by name
  $scope.toggleSelection = function toggleSelection(match) {
    var idx = $scope.selectionIds.indexOf(match.id);
    // is currently selected
    if (idx > -1) {
      $scope.selectionIds.splice(idx, 1);
      $scope.selectionMatches.splice(idx, 1);
    }
    // is newly selected
    else {
      $scope.selectionIds.push(match.id);
      $scope.selectionMatches.push(match);
    }
    console.log($scope.selectionMatches);
  };

  $scope.doDelete = function () {
    //console.log($scope.selection);
    //TODO 优化为批量删除，或者等全部删除后再刷新
    for (var i = 0; i < $scope.selectionMatches.length; i++) {
      var match = $scope.selectionMatches[i];
      match.aliveFlag = '0';
      MatchService.deleteMatch(match, $scope.refresh);
    }
  };

  $scope.changeMatchDate = function(){
    console.log("date change");
  };

}

MatchCtrl.$inject = ['$scope', 'PersonService', '$filter', 'UserService', 'AuthenticationService', 'ContractService', 'MatchService'];

angular.module('angularApp')
  .controller('MatchCtrl', MatchCtrl);
