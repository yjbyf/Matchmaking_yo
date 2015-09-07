'use strict';


/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('UserCtrl', function ($scope,$http,$location) {
    $scope.webServiceRootUrl = "http://"+$location.host()+":8080/user";
    $scope.webServicesSearchUrl = $scope.webServiceRootUrl  +  "/search/findByUserName";
    //$scope.userName = "";
    //$scope.password = "";

    $http.get($scope.webServiceRootUrl).then(function(data){
      console.log(data);
      console.log(data.data._embedded.user);
      $scope.users = data.data._embedded.user;
    });

    /*
    $scope.users = [
      {
        'id': '1',
        'userName': '陈老师'
      },
      {
        'id': '2',
        'userName': '白老师'
      }
    ];*/

    $scope.newRecord = function () {
      $scope.selectedUserId = null;
      $scope.selectedUser = null;
      $('#userModal').modal();
    };

    $scope.modRecord = function (id) {
      $scope.selectedUserId = id;
      //console.log(id);
      $.each($scope.users, function (i, user) {
        //console.log(people.id);
        if (user.id === id) {
          console.log(i + ' ' + user.userName);
          $scope.selectedUser = user;
        }

      });

      $('#userModal').modal();
    };

    $scope.saveRecord = function(){
      console.log($scope.selectedUser.userName);
      console.log($scope.selectedUser.password);

      $http({
        url:$scope.webServiceRootUrl,
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'userName': $scope.selectedUser.userName,
          'password': $scope.selectedUser.password
        }
      }).
        then(function(response) {
          console.log("done add");
          $('#userModal').modal('toggle');
          //todo refresh grid
          // this callback will be called asynchronously
          // when the response is available
        }, function(response) {
          console.log("done error");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };
  });
