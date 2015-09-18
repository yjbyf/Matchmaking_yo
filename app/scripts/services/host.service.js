(function () {
  'use strict';


  function HostService($location) {
      var devFlag = true;//是否本地开发项目
      function getHost() {
        if (!devFlag){
          return "104.160.34.207"; //发布时改成服务器ip
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
