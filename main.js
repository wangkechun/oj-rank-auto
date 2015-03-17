(function() {
  var app, bodyCtrl, scoreFilter, yearFilter;

  bodyCtrl = function($scope, $http, $filter) {
    var scoreFilter;
    scoreFilter = $filter('score');
    $http.get('out.json').success(function(data) {
      var user, _i, _len, _ref, _results;
      console.log(data);
      $scope.data = data;
      $scope.clickuser(0);
      _ref = $scope.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        user = _ref[_i];
        user.real = {};
        user.real.hdu = parseInt(scoreFilter(user.score.hdu));
        user.real.hn = parseInt(scoreFilter(user.score.hn));
        user.real.bnu = parseInt(scoreFilter(user.score.bnu));
        user.real.poj = parseInt(scoreFilter(user.score.poj));
        user.real.acdream = parseInt(scoreFilter(user.score.acdream));
        user.real.cf = parseInt(scoreFilter(user.score.cf));
        user.real.bestcoder = parseInt(scoreFilter(user.score.bestcoder));
        _results.push(user.real.codechef = parseInt(scoreFilter(user.score.codechef)));
      }
      return _results;
    });
    $scope.clickuser = function(user) {
      var i, k, t, v, _ref, _results;
      $scope.usernow = user;
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
        case "bnu":
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

  yearFilter = function() {
    return function(data, year) {
      return _.filter(data, function(i) {
        if (year === "all") {
          return true;
        }
        return i.id.slice(0, 2) === year;
      });
    };
  };

  app = angular.module('myapp', []);

  app.controller('bodyCtrl', bodyCtrl);

  app.filter('score', scoreFilter);

  app.filter('year', yearFilter);

}).call(this);
