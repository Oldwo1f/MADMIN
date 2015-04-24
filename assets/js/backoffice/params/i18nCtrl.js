app.controller('i18nCtrl', ['$scope', '$auth','traduction','$state','$stateParams','configService','paramsService','messageCenterService', function($scope, $auth,traduction,$state,$stateParams,configService,paramsService,messageCenterService) {
	console.log('i18nCtrl');
   
   	// $scope.languages = configService.languages;
	console.log(traduction);
	$scope.traduction=traduction;
	$scope.lang=$stateParams.lang;
	console.log($scope.lang);
	$scope.save=function() {
		console.log('$scope.traduction',$scope.traduction);
		paramsService.saveTraduction($scope.lang,$scope.traduction).then(function() {
			messageCenterService.add('success', 'Traduction "'+$scope.lang+'" enregistrée', { status: messageCenterService.status.next ,timeout: 3000});
		},function() {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.next ,timeout: 3000});
		})
	};
	$scope.changelang =function () {

		console.log($scope.lang);
		$state.go('/.i18n',{lang:$scope.lang})
	};

}]);