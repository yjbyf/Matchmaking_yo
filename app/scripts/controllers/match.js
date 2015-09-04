'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MatchCtrl', function ($scope) {
	$scope.peoples =[
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
  });
