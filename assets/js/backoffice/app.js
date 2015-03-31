var app = angular.module('app', ['jsTag','ui.router','ngLocale','markdownpreview','ui.bootstrap','angularFileUpload','MessageCenterModule','color-picker','ngFabForm','ngAnimate','satellizer','sails.io','angularMoment','chart.js','ngImgCrop']);

app.run(['amMoment', function(amMoment) {
    amMoment.changeLocale('fr');
}]);
app.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
        $rootScope.previousState_name = fromState.name;
        $rootScope.previousState_params = fromParams;
    });
    $rootScope.back = function() {
        if($rootScope.previousState_name)
        {
            $state.go($rootScope.previousState_name,$rootScope.previousState_params);
        }else{
            $state.go('/.dashboard');
        }
    };
}]);
app.config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider,$authProvider) {

    // $urlRouterProvider.when('/',"/dashboard");
    // $urlRouterProvider.when('/login',"../");
    $urlRouterProvider.otherwise("/");


    $stateProvider
    .state('/', {
      url: "/",
      views: {
          'rootView':{
            templateUrl:"/templates/backoffice/global/root.html"
          },
          'menuView':{
            controller:'mainCtrl',
            templateUrl:"/templates/backoffice/global/menu.html"
          }
      }
    })
    .state('login', {
        url: "/login",
      views: {
          'rootView':{
            templateUrl:"/templates/backoffice/global/login.html",
            controller:'LoginCtrl'
          }
      }
    })
    .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
    })
    .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
    })
// DASHBOARD     
            .state('/.dashboard', {
                url: "dashboard",

                views: {
                    '':{
                        templateUrl:"/templates/backoffice/global/dashboard.html"
                    }
                }
            })
            .state('/.profile', {
                url: "profile",
                views: {
                    '':{
                        controller:'profileCtrl',
                        templateUrl:"/templates/backoffice/global/profile.html",
                        resolve:{
                              user : ['accountService', function(accountService) {

                                // console.log('resolve');
                                // console.log($stateParams);
                                // return true;
                                return accountService.getProfile();
                              }]
                        }
                    }
                }
            })

// Tags            
            .state('/.tags', {
                url: "tags?page&user&admin&membre&slug",
                views: {
                    '':{
                        // resolve: {
                          // users: function(userService,$stateParams) {
                          //       console.log($stateParams);
                          //   return userService.fetchUsers($stateParams);
                          // }
                        // },
                        controller:'tagsCtrl',
                        templateUrl:"/templates/backoffice/global/tags.html"
                    }
                   
                }
            })  
// USER            
            .state('/.users', {
                url: "users?page&user&admin&membre&slug",
                views: {
                    '':{
                        // resolve: {
                          // users: function(userService,$stateParams) {
                          //       console.log($stateParams);
                          //   return userService.fetchUsers($stateParams);
                          // }
                        // },
                        controller:'usersCtrl',
                        templateUrl:"/templates/backoffice/user/user.html"
                    }
                   
                }
            })            
                    .state('/.users.add', {
                        url: "/add",
                        views: {
                            '':{
                                controller:'addUserCtrl',
                                templateUrl:"/templates/backoffice/user/add.html"
                            }
                        }
                    })            
                    .state('/.users.edit', {
                        url: "/edit/:id",
                        views: {
                            '':{
                                templateUrl:"/templates/backoffice/user/edit.html",
                                controller:'editUserCtrl',
                                resolve:{
                                  user : ['userService', '$stateParams', function(userService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return userService.fetchUser($stateParams.id);
                                  }]
                                }
                            }
                        }
                    })

// BLOG            
            .state('/.categories', {
                url: "categories",

                views: {
                    '':{
                      templateUrl:"/templates/backoffice/blog/category.html"
                    }
                }
            })            
                    .state('/.categories.add', {
                        url: "/add",
                        views: {
                          '':{
                            templateUrl:"/templates/backoffice/blog/addcategory.html"
                            }
                        }
                    })            
                    .state('/.categories.edit', {
                        url: "/edit",
                        views: {
                          '':{
                            templateUrl:"/templates/backoffice/blog/editcategory.html"
                          }
                        }
                    })
            .state('/.articles', {
                url: "articles",

                views: {
                    '':{
                      templateUrl:"/templates/backoffice/blog/articles.html"
                    }
                }
            })    
                    .state('/.articles.add', {
                        url: "/add",
                        views: {
                          '':{
                            templateUrl:"/templates/backoffice/blog/addarticle.html"
                            }
                        }
                    })            
                    .state('/.articles.edit', {
                        url: "/edit",
                        views: {
                          '':{
                            templateUrl:"/templates/backoffice/blog/editarticle.html"
                          }
                        }
                    })




        .state('/.images', {
                url: "media/images",

                views: {
                    '':{
                        controller : 'imageCtrl',
                        templateUrl:"/templates/backoffice/media/images.html"
                    }
                }
            }) 
        .state('/.documents', {
                url: "media/documents",

                views: {
                    '':{
                        controller : 'documentsCtrl',
                        templateUrl:"/templates/backoffice/media/documents.html"
                    }
                }
            })  

}]);