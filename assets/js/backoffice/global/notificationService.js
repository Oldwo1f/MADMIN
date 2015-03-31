app.factory('notificationService', ['$http', '$q', '$rootScope', '$auth', function ($http,$q, $rootScope,$auth) {
    var service = {};
    // service.users=[];

    // service.nbNotifications = 0;
    // service.notifications=[];
    // service.notificationsToValidate=[];

    // console.log(service.nbNotifications);
    // var events = {}
    // function trigger(eventName) {
    //       (events[eventName] || angular.noop)();
    //     }

    // service.on = function(eventName, cb) {
    //     events[eventName] = cb;
    // }

    // service.connectSocket=function(user){
    //     var deferred = $q.defer();
    //     console.log('-------->>>>');
    //     // console.log($auth.getToken);
    //     console.log('-------->>>>');
    //     $sails.request({url:"/subscribeNotif",method:'GET',})
    //     // $sails.get("/subscribeNotif").then(function(resp){
    //     //     // console.log('log all Notif');
    //     //       service.notifications = resp.data;
    //     //       service.notificationsToValidate = resp.data;
    //     //       service.nbNotifications=service.notificationsToValidate.length;
    //     //       deferred.resolve();
    //     //   }, function(resp){
    //     //     console.log(resp);
    //     //     deferred.reject(resp);
    //     // });

    //     return deferred.promise; 
    // }

    // $sails.on("notification", function (message) {
    //   // console.log('Notif = '+message.verb);
    //   // console.log(message);
    //   // console.log(service.nbNotifications);
    //   if (message.verb === "created") {
    //     // service.nbNotifications= 50;
    
    //     service.nbNotifications++;
    //     service.notifications.unshift(message.data);
    //     if(service.notifications.length>10)
    //        service.notifications.pop(); 
    //     trigger('notification')

    //     }
    // });

    

    
    // service.validNotification=function () {
    //     // console.log('here');
    //     var deferred = $q.defer();
    //     service.nbNotifications=0;
    //     // console.log(service.nbNotifications);
    //     // service.notificationsViewed = service.notifications;
    //     // console.log(service.notifications);
    //     $sails.post('/validateNotifications', service.notifications).then(function (resp) {
    //        // console.log('resp');
    //        console.log(resp);

    //     },function (err,data) {
            
    //     })



    //     deferred.resolve({'nbNotifications':service.nbNotifications});
    //     return deferred.promise;
    // }
 




    return service;
}]);