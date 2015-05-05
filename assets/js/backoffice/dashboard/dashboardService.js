app.factory('dashboardService', ['$http', '$q', function ($http,$q) {
    var service = {};
    

    service.getChiffre= function(lang) {
        var deferred = $q.defer();
        // console.log(stateParams);
        // console.log(service.filter);
        $http({method:'get',url:'/countAll'}).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    }; 

    service.Analitycs= function(mode,metric) {
        var deferred = $q.defer();
        // console.log(stateParams);
        // console.log(service.filter);
        $http({method:'get',url:'/analytics/'+mode+'/'+metric}).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    }; 

    service.getBestBlogger= function(mode,metric) {
        var deferred = $q.defer();
        $http({method:'get',url:'/getBestBlogger'}).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    }; 
    service.getNewComments= function() {
        var deferred = $q.defer();
        
        $http({method:'get',url:'/getNewComments'}).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    }; 
    service.getNotifications= function(page) {
        console.log('loadNotifloadNotif');
        var deferred = $q.defer();
        $http({method:'get',url:'/getNotifications/'+page}).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    }; 
    service.getSocials= function(page) {
        console.log('getSocials');
        var deferred = $q.defer();
        $http({method:'get',url:'/getSocials'}).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    }; 
   
    return service;
}]);