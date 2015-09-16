(function () {
  'use strict';


  function HostService($location) {
      var devFlag = true;
      function getHost() {
        if (!devFlag){
          return "104.160.34.207";
        }else {
          return $location.host();
        }
      }


    var service = {};
    service.getHost = getHost;
    return service;

  }

  HostService.$inject = ['$location'];

  angular
    .module('angularApp')
    .factory('HostService', HostService);


})();
