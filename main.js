(function() {
  var app, bodyCtrl, scoreFilter;

  bodyCtrl = function($scope, $http) {
    return $http.get('/out.json').success(function(data) {
      console.log(data);
      return $scope.data = data;
    });
  };

  scoreFilter = function() {
    return function(data) {
      var r;
      console.log(data);
      r = _.pluck(data, 'score');
      r = _.max(r);
      if (r < 0) {
        return -1;
      }
      return r;
    };
  };

  app = angular.module('myapp', ['ui.bootstrap']);

  app.controller('bodyCtrl', bodyCtrl);

  app.filter('score', scoreFilter);

}).call(this);
