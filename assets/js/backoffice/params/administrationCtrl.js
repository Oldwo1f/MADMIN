app.controller('administrationCtrl', ['$scope', '$auth','stockage','$state','$stateParams','configService','paramsService','messageCenterService','$filter', function($scope, $auth,stockage,$state,$stateParams,configService,paramsService,messageCenterService,$filter) {
	console.log('administrationCtrl');
   
   	// $scope.languages = configService.languages;
	// console.log(traduction);
	$scope.sizequota=configService.sizequota;
	$scope.imageSize=stockage.totalImage;
	$scope.fileSize=stockage.totalFile;
	$scope.depassement= Number(($scope.imageSize+$scope.fileSize)-$scope.sizequota)
	$scope.freespace= Number($scope.sizequota-($scope.imageSize+$scope.fileSize))
	console.log('depassement',$scope.depassement);
	// $scope.lang=$stateParams.lang;
	console.log($scope.lang);
	$scope.save=function() {
		console.log('$scope.traduction',$scope.traduction);
		paramsService.saveTraduction($scope.lang,$scope.traduction).then(function() {
			messageCenterService.add('success', 'Article enregisté', { status: messageCenterService.status.next ,timeout: 3000});
		},function() {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.next ,timeout: 3000});
		})
	};

	var freespace = $filter('bytes')($scope.freespace)
	var fileSize = $filter('bytes')($scope.fileSize)
	var imageSize = $filter('bytes')($scope.imageSize)
	console.log();
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