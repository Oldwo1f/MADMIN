app.controller('administrationCtrl', ['$scope', '$auth','stockage','version','dbstats','$state','$stateParams','configService','paramsService','messageCenterService','$filter', function($scope, $auth,stockage,version,dbstats,$state,$stateParams,configService,paramsService,messageCenterService,$filter) {
	console.log('administrationCtrl');
   
   	// $scope.languages = configService.languages;
	// console.log(traduction);
	$scope.sizequota=configService.sizequota;
	$scope.myversion=version;
	console.log(dbstats);
	$scope.dbstats=dbstats;
	console.log(stockage);
	$scope.imageSize=Number(stockage.totalImage);
	$scope.fileSize=Number(stockage.totalFile);
	$scope.depassement= Number(($scope.imageSize+$scope.fileSize)-$scope.sizequota)
	$scope.freespace= Number($scope.sizequota-($scope.imageSize+$scope.fileSize))
	console.log('depassement',$scope.depassement);
	console.log('depassement',$scope.freespace);
	console.log('imageSize',$scope.imageSize);
	

	var freespace = $filter('bytes')(Number($scope.freespace))
	var fileSize = $filter('bytes')(Number($scope.fileSize))
	var imageSize = $filter('bytes')(Number($scope.imageSize))
	console.log(fileSize);
	$scope.data2 = [$scope.imageSize,$scope.fileSize,$scope.freespace]
    $scope.colors =  ['#2364ba','#f27d1d','#5cb85c'];
// console.log($filter('bytes')($scope.imageSize));

    $scope.labels2 = ['Images','Documents','Espace libre'];
    $scope.options2 = {
    	showTooltips: false,
    }
  	// $scope.data2 = [56,89,15,75,23];
	// $scope.changelang =function () {

	// 	console.log($scope.lang);
	// 	$state.go('/.i18n',{lang:$scope.lang})
	// };

}]);