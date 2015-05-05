app.controller('mainCtrl',['$scope', 'filterFilter', '$filter', '$state', 'notificationService','accountService','ngAudio',function mainCtrl($scope,filterFilter,$filter,$state,notificationService,accountService,ngAudio) {
	$scope.nbNotifications=0;
	$scope.notifications=[];
	if(!$scope.me){
		$scope.me = accountService.getProfile().then(function  (data) {
			$scope.me = data
		})
	}
  	notificationService.connectSocket().then(function (argument) {
		$scope.nbNotifications = notificationService.nbNotifications;
  		$scope.notifications = notificationService.notifications;
  	});

  	$scope.sound =  ngAudio.load("bip.mp3")
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

  	notificationService.on('notification', function(d) {
  		console.log(d);
  		if(d.sound=="todo")
  			$scope.sound.play()
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
	$scope.clearNotif=function() {
		$scope.notifications = _.remove($scope.notifications, function(n) {
		  return n.status != 'ok';
		});
		console.log($scope.notifications);
		notificationService.notifications =$scope.notifications
	}

	$scope.goTo=function(item,itemid) {
		if(item=='article')
		$state.go('/.articles.edit',{id:itemid,tabstate:'coment'})
		if(item=='project'){
		console.log(itemid);
		$state.go('/.projects.edit',{id:itemid,tabstate:'coment'})
		}
	}
}]);