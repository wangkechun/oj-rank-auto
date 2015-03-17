bodyCtrl = ($scope,$http)->
	$http.get('/out.json').success (data)->
		console.log data
		$scope.data = data
		$scope.clickuser(0)

	$scope.clickuser = ($index)->
		$scope.usernow = $scope.data[$index]
		window.w = $scope
		$scope.usernow.ojlist = []
		for k,v of $scope.usernow.score
			for i in v
				t = [k,i.name,i.score]
				$scope.usernow.ojlist.push(t)

	$scope.ojurl = (oj,name)->
		switch oj
			when "hdu" then "http://acm.hdu.edu.cn/userstatus.php?user="+name
			when "hn" then "http://125.221.232.253/JudgeOnline/userinfo.php?user="+name
			when "bnuoj" then "http://www.bnuoj.com/v3/userinfo.php?name="+name.replace("_","")
			when "poj" then "http://poj.org/userstatus?user_id="+name
			when "acdream" then "http://acdream.info/user/"+name
			when "cf" then "http://codeforces.com/profile/"+name
			when "bestcoder" then "http://bestcoder.hdu.edu.cn/rating.php?user="+name
			when "codechef" then "http://www.codechef.com/users/"+name


scoreFilter = ->
	(data)->
		r = _.pluck(data,'score')
		r = _.max(r)
		if r<0 then return -1
		return r


app = angular.module('myapp',['ui.bootstrap'])
app.controller('bodyCtrl',bodyCtrl)
app.filter('score',scoreFilter)
