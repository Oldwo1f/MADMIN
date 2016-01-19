app.factory('htmlService', ['$http', '$q','$sailsSocket', function ($http,$q,$sailsSocket) {
    var service = {};
    service.items=[];
    service.currentpage=[];

    service.filter={slug:'',page:1,order:'createdAt DESC',perPage:10};

    service.fetchAll= function(stateParams) {
        var deferred = $q.defer();
        // console.log(stateParams);
        // console.log(service.filter);
        $http({method:'get',url:'/html/fetch'}).success(function (data,status) {
            console.log(data);
            service.items =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };

    service.autocomplete= function(query) {
        var deferred = $q.defer();

        $http.get('/project/list/'+query).success(function (data,status) {
            // service.items=data
            deferred.resolve(data);
        }).error(function (data,status) {
            // messageCenterService.add('danger', 'Erreur dans la récupération de l\'utilisateur', { status: messageCenterService.status.unseen, timeout: 4000 });
            deferred.reject('error perso');
        })

        return deferred.promise;
    };

    service.fetch= function(name) {
        var deferred = $q.defer();

        $http.get('/html/fetchone/'+name).success(function (data,status) {
            service.currentpage=data
            deferred.resolve(data);
        }).error(function (data,status) {
            // messageCenterService.add('danger', 'Erreur dans la récupération de l\'utilisateur', { status: messageCenterService.status.unseen, timeout: 4000 });
            deferred.reject('error perso');
        })

        return deferred.promise;
    };

    // service.loadGraph= function(mode) {
    //     var deferred = $q.defer();
    //     // var period= 'month';
    //     $http.get('/project/graph/'+mode).success(function (data,status) {
    //         console.log('resolveGRAPH');
    //         console.log(data);
    //         deferred.resolve(data);
    //     // }).error(function (data,status) {
    //         deferred.reject('error perso');
    //     })

    //     return deferred.promise;
    // };
    // service.loadGraph2= function(mode) {
    //     var deferred = $q.defer();
    //     // var period= 'month';
    //     $http.get('/project/graph2/'+mode).success(function (data,status) {
    //         console.log('resolveGRAPH');
    //         console.log(data);
    //         deferred.resolve(data);
    //     }).error(function (data,status) {
    //         deferred.reject('error perso');
    //     })

    //     return deferred.promise;
    // };
    



    service.save=function(name,page){

        console.log('save');
        var deferred = $q.defer();
        // project.role = 'project'
         $http.post('/html/save',{name:name,page:page}).success(function (data2,status2) {
            console.log('SUCCESS');
            console.log(data2);
            deferred.resolve(data2);
            

        }).error(function (data,status) {

            console.log(data);
            deferred.reject(data);
        })
        
        return deferred.promise;      
    }


    service.edit=function(project){

        console.log('EDIT Service');
        var deferred = $q.defer();
        // project.role = 'project'
        $http.put('/project',project).success(function (data2,status2) {
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

    service.remove=function(project){

        console.log('REMOVE Service');
        var deferred = $q.defer();
        // project.role = 'project'
        $http.delete('/project/'+project).success(function (data2,status2) {
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