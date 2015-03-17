(function() {
  var app, bodyCtrl, scoreFilter;

  bodyCtrl = function($scope, $http) {
    $http.get('/out.json').success(function(data) {
      console.log(data);
      $scope.data = data;
      return $scope.clickuser(0);
    });
    $scope.clickuser = function($index) {
      var i, k, t, v, _ref, _results;
      $scope.usernow = $scope.data[$index];
      window.w = $scope;
      $scope.usernow.ojlist = [];
      _ref = $scope.usernow.score;
      _results = [];
      for (k in _ref) {
        v = _ref[k];
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = v.length; _i < _len; _i++) {
            i = v[_i];
            t = [k, i.name, i.score];
            _results1.push($scope.usernow.ojlist.push(t));
          }
          return _results1;
        })());
      }
      return _results;
    };
    return $scope.ojurl = function(oj, name) {
      switch (oj) {
        case "hdu":
          return "http://acm.hdu.edu.cn/userstatus.php?user=" + name;
        case "hn":
          return "http://125.221.232.253/JudgeOnline/userinfo.php?user=" + name;
        case "bnuoj":
          return "http://www.bnuoj.com/v3/userinfo.php?name=" + name.replace("_", "");
        case "poj":
          return "http://poj.org/userstatus?user_id=" + name;
        case "acdream":
          return "http://acdream.info/user/" + name;
        case "cf":
          return "http://codeforces.com/profile/" + name;
        case "bestcoder":
          return "http://bestcoder.hdu.edu.cn/rating.php?user=" + name;
        case "codechef":
          return "http://www.codechef.com/users/" + name;
      }
    };
  };

  scoreFilter = function() {
    return function(data) {
      var r;
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
