app.factory('userService', ['$http', '$q', function ($http,$q) {
    var service = {};
    service.users=[];

    service.filter={member:true,user:true,admin:true,slug:'',page:1,order:'createdAt DESC',perPage:10};

    service.fetchUsers= function(stateParams) {
        var deferred = $q.defer();
        // console.log(stateParams);
        // console.log(service.filter);
        $http({method:'get',url:'/fetchUsers',params:service.filter}).success(function (data,status) {
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
    


    service.fetchMe= function() {
        var deferred = $q.defer();

        $http.get('/user/fetchMe').success(function (data,status) {
            deferred.resolve(data);
        }).error(function (data,status) {
            // messageCenterService.add('danger', 'Erreur dans la récupération de l\'utilisateur', { status: messageCenterService.status.unseen, timeout: 4000 });
            deferred.reject('error perso');
        })

        return deferred.promise;
    };

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

    service.loadGraph= function(mode) {
        var deferred = $q.defer();
        // var period= 'month';
        $http.get('/user/graph/'+mode).success(function (data,status) {
            console.log('resolveGRAPH');
            console.log(data);
            deferred.resolve(data);
        // }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };
    service.loadGraph2= function(mode) {
        var deferred = $q.defer();
        // var period= 'month';
        $http.get('/user/graph2/'+mode).success(function (data,status) {
            console.log('resolveGRAPH');
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };
    



    service.addNew=function(user){

        console.log('ADDNEW Service');
        var deferred = $q.defer();
        // user.role = 'user'
        $http.post('/user/add',user).success(function (data2,status2) {
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
    service.editUser=function(user){

        console.log('EDIT Service');
        var deferred = $q.defer();
        // user.role = 'user'
        $http.put('/user',user).success(function (data2,status2) {
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
    service.editProfile=function(user){

        console.log('EDIT Service');
        var deferred = $q.defer();
        // user.role = 'user'
        $http.put('/editProfile',user).success(function (data2,status2) {
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
    service.remove=function(user){

        console.log('REMOVE Service');
        var deferred = $q.defer();
        // user.role = 'user'
        $http.delete('/user/'+user).success(function (data2,status2) {
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

    // service.addClient=function(user){
    //     var deferred = $q.defer();
    //     user.role = 'client';
    //     $http.post('/user',user).success(function (data2,status2) {
    //         $http.get('/user/'+data2.id).success(function (data,status) {
    //             service.users.unshift(data);
    //             messageCenterService.add('success', 'Utilisateur ajouté', { status: messageCenterService.status.unseen, timeout: 4000 });

    //             deferred.resolve(data);
    //         })
    //     }).error(function (data,status) {
    //         // messageCenterService.add('danger', data, { status: messageCenterService.status.unseen, timeout: 4000 });
    //          deferred.reject(data);
    //     })
        
    //     return deferred.promise;      
    // }

    // service.edit=function(user){
    //     var deferred = $q.defer();
    //     $http.put('/user/'+user.id,user).success(function (data2,status) {
    //         $http.get('/user/'+user.id).success(function (data,status) {
    //             service.users.splice(getIndexInBy(service.users,'id',user.id),1,data)
    //             messageCenterService.add('success', 'Utilisateur enregirsté', { status: messageCenterService.status.unseen, timeout: 4000 });
    //             deferred.resolve(data);
    //         })
    //     }).error(function (data,status) {
    //         messageCenterService.add('danger', data, { status: messageCenterService.status.unseen, timeout: 4000 });

    //         deferred.reject(data);

    //     })
    //     return deferred.promise;
    // }

    // service.remove=function(catArray){

    //     for(var i in catArray)
    //     {
    //         $http.delete('/user/'+catArray[i].id).success(function (user,status) {
    //             service.users.splice(getIndexInBy(service.users,'id',user.id),1)
    //             messageCenterService.add('success', 'Suppréssion réussie', { status: messageCenterService.status.unseen, timeout: 4000 });

    //         }).error(function (data,status) {
    //             messageCenterService.add('danger', data, { status: messageCenterService.status.unseen, timeout: 4000 });

    //         })
    //     }
         
    // }


    return service;
}]);