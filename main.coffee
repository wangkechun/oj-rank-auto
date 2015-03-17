bodyCtrl = ($scope,$http,$filter)->
	scoreFilter = $filter('score')
	$http.get('out.json').success (data)->
		console.log data
		$scope.data = data
		$scope.clickuser(0)
		for user in $scope.data
			user.real = {}
			user.real.hdu = parseInt(scoreFilter(user.score.hdu))
			user.real.hn = parseInt(scoreFilter(user.score.hn))
			user.real.bnu = parseInt(scoreFilter(user.score.bnu))
			user.real.poj = parseInt(scoreFilter(user.score.poj))
			user.real.acdream = parseInt(scoreFilter(user.score.acdream))
			user.real.cf = parseInt(scoreFilter(user.score.cf))
			user.real.bestcoder = parseInt(scoreFilter(user.score.bestcoder))
			user.real.codechef = parseInt(scoreFilter(user.score.codechef))

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
			when "bnu" then "http://www.bnuoj.com/v3/userinfo.php?name="+name.replace("_","")
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

yearFilter = ->
	(data,year)->
		_.filter data,(i)->
			if year== "all"
				return true
			i.id[0..1]==year


app = angular.module('myapp',['ui.bootstrap'])
app.controller('bodyCtrl',bodyCtrl)
app.filter('score',scoreFilter)
app.filter('year',yearFilter)
