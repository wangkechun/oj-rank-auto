bodyCtrl = ($scope,$http)->
	$http.get('/out.json').success (data)->
		console.log data
		$scope.data = data

scoreFilter = ->
	(data)->
		console.log data
		r = _.pluck(data,'score')
		r = _.max(r)
		if r<0 then return -1
		return r


app = angular.module('myapp',['ui.bootstrap'])
app.controller('bodyCtrl',bodyCtrl)
app.filter('score',scoreFilter)


