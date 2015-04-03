app.factory('categoryBlogService', ['$http', '$q', function ($http,$q) {
    var service = {};
    service.items=[];

    service.filter={slug:'',page:1,order:'createdAt DESC',perPage:10};

    service.fetchAll= function(stateParams) {
        var deferred = $q.defer();
        // console.log(stateParams);
        // console.log(service.filter);
        $http({method:'get',url:'/categoryBlog/fetch',params:service.filter}).success(function (data,status) {
            console.log(data);
            service.items =data;
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };
    service.list= function(stateParams) {
        var deferred = $q.defer();
        // console.log(stateParams);
        // console.log(service.filter);
        $http({method:'get',url:'/categoryBlog/list'}).success(function (data,status) {
            console.log(data);
            deferred.resolve(data);
        }).error(function (data,status) {
            deferred.reject('error perso');
        })

        return deferred.promise;
    };

    service.autocomplete= function(query) {
        var deferred = $q.defer();

        $http.get('/categoryBlog/list/'+query).success(function (data,status) {
            // service.items=data
            deferred.resolve(data);
        }).error(function (data,status) {
            // messageCenterService.add('danger', 'Erreur dans la récupération de l\'utilisateur', { status: messageCenterService.status.unseen, timeout: 4000 });
            deferred.reject('error perso');
        })

        return deferred.promise;
    };

    service.fetch= function(id) {
        var deferred = $q.defer();

        $http.get('/categoryBlog/'+id).success(function (data,status) {
            service.items=data
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
    //     $http.get('/categoryBlog/graph/'+mode).success(function (data,status) {
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
    //     $http.get('/categoryBlog/graph2/'+mode).success(function (data,status) {
    //         console.log('resolveGRAPH');
    //         console.log(data);
    //         deferred.resolve(data);
    //     }).error(function (data,status) {
    //         deferred.reject('error perso');
    //     })

    //     return deferred.promise;
    // };
    



    service.add=function(categoryBlog){

        console.log('ADDNEW Service');
        var deferred = $q.defer();
        // categoryBlog.role = 'categoryBlog'
        $http.post('/categoryBlog/add',categoryBlog).success(function (data2,status2) {
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
    service.edit=function(categoryBlog){

        console.log('EDIT Service');
        var deferred = $q.defer();
        // categoryBlog.role = 'categoryBlog'
        $http.put('/categoryBlog',categoryBlog).success(function (data2,status2) {
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

    service.remove=function(categoryBlog){

        console.log('REMOVE Service');
        var deferred = $q.defer();
        // categoryBlog.role = 'categoryBlog'
        $http.delete('/categoryBlog/'+categoryBlog).success(function (data2,status2) {
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