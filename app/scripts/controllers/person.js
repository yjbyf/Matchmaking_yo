'use strict';
/**
 * @ngdoc function
 * @name angularApp.controller:PersonCtrl
 * @description
 * # PersonCtrl
 * Controller of the angularApp
 */
function PersonCtrl($scope, PersonService, $filter) {
  /*
   $scope.persons =[
   {
   'id':'1',
   'name':'杜甫',
   'gender':'男',
   'registerDate':'2015-01-02',
   'fee':100,
   'birthDate':'1990-04-11',
   'height':170,
   'education':'本科',
   'census':'上海',
   'company':'上海米高梅有限公司',
   'salary':'年薪30w',
   'married':'无',
   'children':'无',
   'house':'独立婚房',
   'phone':'021-1234567'
   },
   {
   'id':'2',
   'name':'李白',
   'gender':'男',
   'registerDate':'2015-02-02',
   'fee':200,
   'birthDate':'1990-04-12',
   'height':171,
   'education':'硕士',
   'census':'北京',
   'company':'北京米高梅有限公司',
   'salary':'月薪3w',
   'married':'无',
   'children':'有',
   'house':'独立婚房',
   'phone':'031-1234567'
   },
   {
   'id':'3',
   'name':'白居易',
   'gender':'男',
   'registerDate':'2015-03-02',
   'fee':300,
   'birthDate':'1990-04-13',
   'height':172,
   'education':'博士',
   'census':'广州',
   'company':'广州米高梅有限公司',
   'salary':'月薪2w',
   'married':'有',
   'children':'有',
   'house':'无婚房',
   'phone':'035-1234567'
   }

   ];
   * */
  $scope.refresh = function () {
    PersonService.getPersonList(function (data) {
      //console.log("person get:"+data);
      if(data.data===undefined){
        return false;
      }
      $scope.persons = data.data;
      /*
      if(data.data._embedded===undefined){
        return false;
      }

      $scope.persons = data.data._embedded.person;*/
      for (var i = 0; i < $scope.persons.length; i++) {
        var person = $scope.persons[i];
        //var href = person._links.self.href;
        //var id = href.substr(href.lastIndexOf("/") + 1);
        //console.log(id);
        person.id = person.pk;
      }
      //console.log("person get:"+data);
    });
  };
  $scope.refresh();


  $scope.newRecord = function () {
    $scope.selectedPerson = null;
    $scope.btnSaveClicked = false;
    $('#personModal').modal();
  };

  $scope.modRecord = function (person) {
    var myObject = JSON.parse(person);
    $scope.selectedPerson = myObject;
    $scope.btnSaveClicked = false;
    $('#personModal').modal();
  };

  $scope.doSave = function (formValid) {
    //console.log(formValid);
    $scope.btnSaveClicked = true;
    if(!formValid) {
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
    for(var i=0;i<$scope.selectionPersons.length;i++){
      var person = $scope.selectionPersons[i];
      person.aliveFlag = '0';
      PersonService.savePerson(person,$scope.refresh);
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

PersonCtrl.$inject = ['$scope', 'PersonService', '$filter'];

angular.module('angularApp')
  .controller('PersonCtrl', PersonCtrl);
