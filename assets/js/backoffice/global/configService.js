app.factory('configService', ['$http', '$q', function ($http,$q) {
    var service = {};
    service.frontConfig={};
    console.log('configService');
    service.h1 = '';
    service.url = '';
   

    service.sizequota=3200000000;
    service.defaultLanguage=[];
    service.languages=[];

    service.getLangs = function () {
        var deferred = $q.defer();
        $http.get('/getLangs').success(function (data,status) {
            service.defaultLanguage.push(data.defaults)
            service.languages=data.locales;
            deferred.resolve(data);
        }).error(function (data,status) {
            // messageCenterService.add('danger', 'Erreur de récupération du profile', { status: messageCenterService.status.unseen, timeout: 4000 });

            deferred.reject('error perso');
        })
        return deferred.promise;
    };
    service.getConfig = function () {
        var deferred = $q.defer();
        console.log('GET COnfig');
        $http.get('/getConfig').success(function (data,status) {
           console.log(data);
           service.url= data.url
           service.h1=data.name;
           deferred.resolve(data);
        }).error(function (data,status) {
           // messageCenterService.add('danger', 'Erreur de récupération du profile', { status: messageCenterService.status.unseen, timeout: 4000 });           deferred.reject('error perso');       })       return deferred.promise;
        });

        return deferred.promise;
   };

    return service;
}]);