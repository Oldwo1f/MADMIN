app.controller('mainCtrl',['$scope', 'filterFilter', '$filter', '$state', 'notificationService', function mainCtrl($scope,filterFilter,$filter,$state,notificationService) {
	$scope.nbNotifications=0;
	$scope.notifications=[];

  	notificationService.connectSocket().then(function (argument) {
		$scope.nbNotifications = notificationService.nbNotifications;
  		$scope.notifications = notificationService.notifications;
  	});

  	// $sails.on("notification", function (message) {
   //    console.log('Notif = '+message.verb);
   //    console.log(message);
   //    // console.log(service.nbNotifications);
   //    if (message.verb === "created") {
   //      // service.nbNotifications= 50;
	
   //      $scope.nbNotifications++;
   //      console.log(notificationService.nbNotifications);
   //      notificationService.notifications.unshift(message.data);
   //      // if(service.notifications.length>10)
   //      //    service.notifications.pop(); 
   //      }
   //  });

  	notificationService.on('notification', function() {
  				$scope.nbNotifications = notificationService.nbNotifications;
  		  		$scope.notifications = notificationService.notifications;
  	})

	$scope.validNotification=function() {
		notificationService.validNotification().then(function success (data) {
			$scope.nbNotifications=data.nbNotifications;
			// $scope.notifications=data.notifications;
			// $scope.notificationsViewed=data.notificationsViewed;
		})
	}
}]);