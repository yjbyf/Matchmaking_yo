'use strict';


/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('UserCtrl', ['$scope', '$http', '$location', 'config', 'md5',function ($scope, $http, $location, config , md5) {

    $scope.refresh = function () {
      console.log(config.apiUrl);
      $http.get($scope.webServiceRootUrl).then(function (data) {
        //console.log(data);
        //console.log(data.data._embedded.user);
        $scope.users = data.data._embedded.user;
        for (var i = 0; i < $scope.users.length; i++) {
          var user = $scope.users[i];
          var href = user._links.self.href;
          var id = href.substr(href.lastIndexOf("/") + 1);
          console.log(id);
          user.id = id;
        }

      });
    };
    $scope.webServiceRootUrl = config.urlHTTP + $location.host() + config.userUrl;//":8080/user/";

    //$scope.webServicesSearchUrl = $scope.webServiceRootUrl  +  "/search/findByUserName";

    $scope.refresh();


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
      $scope.userNameReadonly = '';
      $('#userModal').modal();
    };

    $scope.modRecord = function (user) {
      //var myObject = eval('(' + user + ')');
      var myObject = JSON.parse(user);
      //var href = myObject._links.self.href;
      var id = myObject.id;
      //console.log(href);
      //console.log();
      //console.log(myObject._links.self.href);
      $scope.userNameReadonly = 'readonly';
      $scope.selectedUserId = id;

      $scope.selectedUser = myObject;
      $('#userModal').modal();
    };

    $scope.delRecord = function (id) {
      //var myObject = eval('(' + user + ')');
      //var myObject = JSON.parse(user);
      //var href = myObject._links.self.href;
      $scope.idToBeDeleted = id;
      //TODO CONFIRM DELTE AND DO DELETE WITH HTTP
      console.log("delete:" + id);
      $("#confirmModal").modal();
    };

    $scope.confirmDelete = function () {
      $("#confirmModal").modal('toggle');
      //TODO DELETE
      $http.delete($scope.webServiceRootUrl + $scope.idToBeDeleted).then(function (response) {
        console.log("done delete" + response);
        //refresh grid
        $scope.refresh();
        // this callback will be called asynchronously
        // when the response is available
      }, function (response) {
        console.log("delete error" + response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    };

    $scope.cancelDelete = function () {
      $("#confirmModal").modal('toggle');
    };

    $scope.saveRecord = function () {
      console.log($scope.selectedUser.userName);
      console.log($scope.selectedUser.password);
      console.log($scope.selectedUser.id);
      if ($scope.selectedUser.id === undefined) {
        $http({
          url: $scope.webServiceRootUrl,
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            'userName': $scope.selectedUser.userName,
            'password': md5.createHash($scope.selectedUser.password)
          }
        }).
          then(function (response) {
            console.log("done add" + response);
            $('#userModal').modal('toggle');
            //refresh grid
            $scope.refresh();
            // this callback will be called asynchronously
            // when the response is available
          }, function (response) {
            console.log("add error" + response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      } else {
        $http.patch(
          $scope.webServiceRootUrl + $scope.selectedUser.id,
          {
            'userName': $scope.selectedUser.userName,
            'password': md5.createHash($scope.selectedUser.password)
          }
        ).then(function (response) {
            console.log("done mod" + response);
            $('#userModal').modal('toggle');
            //refresh grid
            $scope.refresh();
            // this callback will be called asynchronously
            // when the response is available
          }, function (response) {
            console.log("mod error" + response);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      }


    };
  }])
;