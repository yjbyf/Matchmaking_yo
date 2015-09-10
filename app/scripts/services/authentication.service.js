(function () {
    'use strict';


    function AuthenticationService($location,$http, $cookieStore, $rootScope, $timeout,config) {
      var webServiceLginUrl = config.urlHTTP + $location.host() + config.validLoginUul;
      function Login(userName, password,callback) {

        /* Dummy authentication for testing, uses $timeout to simulate api call
         ----------------------------------------------*/
        $timeout(function () {

          $http({
            url: webServiceLginUrl,
            method: "GET",
            params: {"userName":userName,"password":password}
          }).then(function (data) {
            var result = data.data.result;
            //console.log(data.data.result);
            callback(result);
          });

        }, 1000);

        /* Use this for real authentication
         ----------------------------------------------*/
        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });

      }
      function SetCredentials(userName, password) {
        //$rootScope.authenticated=true;
        $rootScope.globals = {
          authenticated : true,
          currentUser: {
            userName: userName,
            password: password
          }
        };
        $http.defaults.headers.common['Authorization'] =  $rootScope.globals.currentUser.userName+","+ $rootScope.globals.currentUser.password; // jshint ignore:line
        $cookieStore.put('globals', $rootScope.globals);


      }

      function ClearCredentials() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = '';
      }

      function getMenuVisible(){
        if ($rootScope.globals.currentUser) {
          return true;
        }else{
          return false;
        }
      }
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.getMenuVisible =  getMenuVisible;

        return service;


        /*
        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
    }*/

    // Base64 encoding service used by AuthenticationService
  /*
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }*/
    }

  AuthenticationService.$inject = ['$location','$http', '$cookieStore', '$rootScope', '$timeout','config'];

  angular
    .module('angularApp')
    .factory('AuthenticationService', AuthenticationService);



})();
