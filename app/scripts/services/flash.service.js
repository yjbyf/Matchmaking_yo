(function () {
    'use strict';

    function FlashService($rootScope) {
      function initService() {
        $rootScope.$on('$locationChangeStart', function () {
          clearFlashMessage();
        });
      }

      function clearFlashMessage() {
        var flash = $rootScope.flash;
        if (flash) {
          if (!flash.keepAfterLocationChange) {
            delete $rootScope.flash;
          } else {
            // only keep for a single location change
            flash.keepAfterLocationChange = false;
          }
        }
      }

      function Success(message, keepAfterLocationChange) {
        $rootScope.flash = {
          message: message,
          type: 'success',
          keepAfterLocationChange: keepAfterLocationChange
        };
      }

      function Error(message, keepAfterLocationChange) {
        $rootScope.flash = {
          message: message,
          type: 'error',
          keepAfterLocationChange: keepAfterLocationChange
        };
      }
        var service = {};
        service.Success = Success;
        service.Error = Error;
        service.clearFlashMessage = clearFlashMessage;
        initService();
        return service;
    }

  angular
    .module('angularApp')
    .factory('FlashService', FlashService);

  FlashService.$inject = ['$rootScope'];

})();
