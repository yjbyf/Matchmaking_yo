(function () {
  'use strict';

  /**
   *日期过滤器，根据结果集里面的两个字段(字段名startDateName,endDateName)，判定传入参数是否在两个日期之间
   *
   */
  angular.module('dateFilter', []).filter('dateFilter', function () {
    return function (items,matchDate,startDateName,endDateName) {
      //console.log("---------------------");
      var out = [];
      if(matchDate === undefined){
        out = items;
        return out;
      }

      if (angular.isArray(items)) {
        items.forEach(function (item) {
          var itemMatches = false;
          var startDate = item[startDateName] ;
          var endDate  = item[endDateName] ;

          if(startDate<=matchDate&&endDate>=matchDate){
            itemMatches=true;
          }

          if (itemMatches) {
            out.push(item);
          }

        });
      } else {
        // Let the output be the input untouched
        out = items;
      }
      return out;
    };
  });

})();
