app.factory('notificationService', ['$http', '$q', '$rootScope', '$auth','$sailsSocket', function ($http,$q, $rootScope,$auth,$sailsSocket) {
    var service = {};
    service.users=[];

    service.nbNotifications = 0;
    service.notifications=[];
    service.notificationsToValidate=[];

    console.log(service.nbNotifications);
    var events = {}
    function trigger(eventName,data) {
        console.log('trigger',data);
          (events[eventName] || angular.noop)(data);
        }

    service.on = function(eventName, cb) {
        events[eventName] = cb;
    }

    service.connectSocket=function(user){
        var deferred = $q.defer();
        console.log('-------->>>>');
        console.log($auth.getToken);
        console.log('-------->>>>');
        $sailsSocket.defaults.headers.common.Authorization = 'Bearer '+ $auth.getToken()
        // $sailsSocket.get({url:"/subscribeNotif",method:'GET'})
        $sailsSocket.get("/subscribeNotif").then(function(resp){
            // console.log('log all Notif');
            $sailsSocket.subscribe('notification',function(message) {
                console.log('Notif = '+message.verb);
              // console.log(message);
                if (message.verb === "created") {
            
                    service.nbNotifications++;
                    console.log('-----------------------');
                    console.log(message.data);
                    console.log(message.data.user);
                    // if(message.data.user)
                    service.notifications.unshift(message.data);
                    trigger('notification',{sound:message.data.status})

                }
                if (message.verb === "updated" && !_.isEmpty(message.data)) {
                    console.log('update');
                    console.log(message);
                    console.log(message.data);
                   var indexNotif = _.findIndex(service.notifications,function(item) {
                        return item.id == message.data.id;
                    })
                   var prevstatus = service.notifications[indexNotif].status
                   console.log("prevstatus",prevstatus);
                    // service.nbNotifications++;
                    service.notifications.splice(indexNotif,1,message.data);
                    if(message.data.status=='ok' && prevstatus=="todo"){
                        console.log('moin moins');  
                        console.log(message.data);  
                         
                        service.nbNotifications--;
                    }
                    trigger('notification',{sound:message.data.status})

                }
            })
            console.log(resp);
              service.notifications = resp.data;
              service.notificationsToValidate = resp.data;
              service.nbNotifications=service.notificationsToValidate.length;
              deferred.resolve();
          }, function(resp){
            console.log(resp);
            deferred.reject(resp);
        });

        return deferred.promise; 
    }

    // $sailsSocket.on("notification", function (message) {
      
    // });

    

    
    service.validNotification=function () {
        console.log('here');
        var deferred = $q.defer();
        service.nbNotifications=0;
        // console.log(service.nbNotifications);
        // service.notificationsViewed = service.notifications;
        // console.log(service.notifications);
        $sailsSocket.post('/validateNotifications', service.notifications).then(function (resp) {
           console.log('resp');
           console.log(resp);
           service.nbNotifications=resp.data.count
           deferred.resolve({'nbNotifications':service.nbNotifications});
        },function (err,data) {
            console.log("err");
            console.log(data);
        })



        
        return deferred.promise;
    }
 




    return service;
}]);