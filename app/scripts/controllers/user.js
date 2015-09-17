'use strict';


/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('UserCtrl', ['$scope', '$http', '$location', 'config', 'md5', 'UserService', 'FlashService', 'HostService',
    function ($scope, $http, $location, config, md5, UserService, FlashService, HostService) {

      $scope.refresh = function () {
        UserService.getUserList(function(data){
          //console.log(data);
          //console.log(data.data._embedded.user);
          $scope.users = data.data._embedded.user;
          for (var i = 0; i < $scope.users.length; i++) {
            var user = $scope.users[i];
            //var href = user._links.self.href;
            //var id = href.substr(href.lastIndexOf("/") + 1);
            //console.log(id);
            user.id = user.pk;
          }
        });
        //console.log(config.apiUrl);

      };
      $scope.webServiceRootUrl = config.urlHTTP + HostService.getHost() + config.userUrl;//":8080/user/";

      //$scope.webServicesSearchUrl = $scope.webServiceRootUrl  +  "/search/findByUserName";
      $(document).ready(function () {
        $scope.refresh();
      });


      $scope.newRecord = function () {
        $scope.selectedUserId = null;
        $scope.selectedUser = null;
        $scope.userNameReadonly = '';
        $scope.btnSaveClicked = false;
        FlashService.clearFlashMessage();
        $('#userModal').modal();
      };

      $scope.modRecord = function (user) {
        //var myObject = eval('(' + user + ')');
        $scope.btnSaveClicked = false;
        var myObject = JSON.parse(user);
        //var href = myObject._links.self.href;
        var id = myObject.id;
        //console.log(href);
        //console.log();
        //console.log(myObject._links.self.href);
        $scope.userNameReadonly = 'readonly';
        $scope.selectedUserId = id;

        $scope.selectedUser = myObject;
        $scope.selectedUser.password = "";
        FlashService.clearFlashMessage();
        $('#userModal').modal();
      };

      $scope.delRecord = function (user) {
        //var myObject = eval('(' + user + ')');
        //var myObject = JSON.parse(user);
        //var href = myObject._links.self.href;
        $scope.toBeDeleted = JSON.parse(user);
        //TODO CONFIRM DELTE AND DO DELETE WITH HTTP
        //console.log("delete:" + id);
        $("#confirmModal").modal();
      };

      $scope.confirmDelete = function () {
        $("#confirmModal").modal('toggle');
        //TODO DELETE
        $scope.toBeDeleted.aliveFlag = '0';
        UserService.setRecordByAdmin($scope.toBeDeleted, function () {
          $scope.refresh();
        });
        /*
        $http.delete($scope.webServiceRootUrl + $scope.idToBeDeleted).then(function (response) {
          console.log("done delete" + response);
          $scope.refresh();

        }, function (response) {
          console.log("delete error" + response);
        });*/

      };

      $scope.cancelDelete = function () {
        $("#confirmModal").modal('toggle');
      };

      $scope.saveRecord = function (formValid) {
        //$scope.btnClicked = true;
        $scope.btnSaveClicked = true;
        if (!formValid) {
          return false;
        }
        //console.log($scope.selectedUser.userName);
        //console.log($scope.selectedUser.password);
        //console.log($scope.selectedUser.id);

        if ($scope.selectedUser.id === undefined) {
          //新增
          UserService.getCount($scope.selectedUser.userName, function (result) {
            if (result > 0) {
              FlashService.Error("已有此用户名" + $scope.selectedUser.userName);
              return false;
            } else {
              $http({
                url: $scope.webServiceRootUrl,
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                data: {
                  'userName': $scope.selectedUser.userName,
                  'staff': $scope.selectedUser.staff,
                  'password': md5.createHash($scope.selectedUser.password),
                  'aliveFlag':'1'
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
            }
          });

        } else {
          UserService.setRecordByAdmin($scope.selectedUser, function () {
            $('#userModal').modal('toggle');
            $scope.refresh();
          });
          /*
           $http.patch(
           $scope.webServiceRootUrl + $scope.selectedUser.id,
           {
           'userName': $scope.selectedUser.userName,
           'password': md5.createHash($scope.selectedUser.password)
           }
           ).then(function (response) {
           console.log("done mod" + response);

           //refresh grid
           $scope.refresh();
           // this callback will be called asynchronously
           // when the response is available
           }, function (response) {
           console.log("mod error" + response);
           // called asynchronously if an error occurs
           // or server returns response with an error status.
           });*/
        }


      };
    }])
;
