app.controller('changepasswordCtrl',['$scope', 'filterFilter', '$filter', '$state', 'notificationService','accountService','ngAudio','$rootScope',function mainCtrl($scope,filterFilter,$filter,$state,notificationService,accountService,ngAudio,$rootScope) {

	$scope.formData={};
	$scope.customFormOptions = {
	    preventInvalidSubmit: true,
	    preventDoubleSubmit: true,
	    scrollToAndFocusFirstErrorOnSubmit: true,
	    scrollAnimationTime: 500,
	    scrollOffset: -100,
	  };
	console.log('changepasswordCtrl');
	$scope.changePass = function() {
			accountService.changePass($scope.formData).then(function(d) {
				console.log(d);
			})
	}
	$scope.close=function () {
		$rootScope.back();
	}
}]);