app.factory('imageService', ['$http', '$q', function ($http,$q) {
    var service = {};
    service.users=[];

    service.filter={member:true,user:true,admin:true,slug:'',page:1,order:'createdAt DESC',perPage:9};

    service.fetch= function(stateParams) {
        var deferred = $q.defer();
        // console.log(stateParams);
        // console.log(service.filter);
        $http({method:'get',url:'/fetchImages',params:service.filter}).success(function (data,status) {
            console.log(data);
            service.users =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };

    // service.fetchClients= function() {
    //     var deferred = $q.defer();

    //     $http.get('/client').success(function (data,status) {
    //         service.users =data;
    //         deferred.resolve(data);
    //     }).error(function (data,status) {
    //         messageCenterService.add('danger', 'Erreur dans la récupération des clients', { status: messageCenterService.status.unseen, timeout: 4000 });
    //         deferred.reject('error perso');
    //     })

    //     return deferred.promise;
    // };
    


    service.fetchUser= function(id) {
        var deferred = $q.defer();

        $http.get('/user/'+id).success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            // messageCenterService.add('danger', 'Erreur dans la récupération de l\'utilisateur', { status: messageCenterService.status.unseen, timeout: 4000 });
            deferred.reject('error perso');
        })

        return deferred.promise;
    };

    



    // service.addNew=function(user){

    //     console.log('ADDNEW Service');
    //     var deferred = $q.defer();
    //     // user.role = 'user'
    //     $http.post('/user/add',user).success(function (data2,status2) {
    //         console.log('SUCCESS');
    //         console.log(data2);
    //         deferred.resolve(data2);
            

    //     }).error(function (data,status) {

    //         // console.log('ERROR');
    //         // console.log(data);
    //         deferred.reject(data);
    //     })
        
    //     return deferred.promise;      
    // }
    service.update=function(img){

        var deferred = $q.defer();
        $http.put('/image',img).success(function (data2,status2) {
            console.log('SUCCESS');
            console.log(data2);
            deferred.resolve(data2);
            

        }).error(function (data,status) {

            // console.log('ERROR');
            // console.log(data);
            deferred.reject(data);
        })
        
        return deferred.promise;      
    }
    // service.editProfile=function(user){

    //     console.log('EDIT Service');
    //     var deferred = $q.defer();
    //     // user.role = 'user'
    //     $http.put('/editProfile',user).success(function (data2,status2) {
    //         console.log('SUCCESS');
    //         console.log(data2);
    //         deferred.resolve(data2);
            

    //     }).error(function (data,status) {

    //         // console.log('ERROR');
    //         // console.log(data);
    //         deferred.reject(data);
    //     })
        
    //     return deferred.promise;      
    // }
    service.remove=function(id){

        console.log('REMOVE Service');
        var deferred = $q.defer();
        // user.role = 'user'
        $http.delete('/image/'+id).success(function (data2,status2) {
            console.log('SUCCESS');
            console.log(data2);
            deferred.resolve(data2);
            

        }).error(function (data,status) {

            // console.log('ERROR');
            // console.log(data);
            deferred.reject(data);
        })
        
        return deferred.promise;      
    }


    return service;
}]);