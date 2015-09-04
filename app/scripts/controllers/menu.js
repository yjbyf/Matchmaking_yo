'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MenuCtrl', function ($scope, $location) {
	$scope.isActive = function (viewLocation) { 
		//console.log($location.path());
        return viewLocation === $location.path();
    };
  });
