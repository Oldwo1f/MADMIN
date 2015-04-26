

var app = angular.module('app', ['videosharing-embed','monospaced.elastic','ui.sortable','ngTagsInput','ui.router','ngLocale','markdownpreview','ui.bootstrap','angularFileUpload','MessageCenterModule','minicolors','ngFabForm','ngAnimate','satellizer','sails.io','angularMoment','chart.js','ngImgCrop']);

app.run(['amMoment', function(amMoment) {
    amMoment.changeLocale('fr');
}]);
app.config(function (minicolorsProvider) {
    angular.extend(minicolorsProvider.defaults, {
      control: 'hue',
      position: 'bottom left',
      theme: 'bootstrap'
    });
  });
function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}
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
app.config(['tagsInputConfigProvider', function(tagsInputConfigProvider) {
  tagsInputConfigProvider
    .setDefaults('tagsInput', {
      placeholder: 'Ajouter un tag',
      minLength: 2,
      addOnEnter: false
    })
    .setDefaults('autoComplete', {
      debounceDelay: 200,
      loadOnDownArrow: true,
      loadOnEmpty: true,
      minLength:2
    })
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
            .state('/.categoriesBlog', {
                url: "categoriesblog",

                views: {
                    '':{
                        controller:'categoryBlogCtrl',
                        templateUrl:"/templates/backoffice/blog/category.html"
                    }
                }
            })            
                    .state('/.categoriesBlog.add', {
                        url: "/add",
                        views: {
                          '':{
                            controller:"addCategoryBlogCtrl",
                            templateUrl:"/templates/backoffice/blog/addcategory.html"
                            }
                        }
                    })            
                    .state('/.categoriesBlog.edit', {
                        url: "/edit:id",
                        views: {
                          '':{
                            controller:'editCategoryBlogCtrl',
                            templateUrl:"/templates/backoffice/blog/editcategory.html",
                            resolve:{
                                  item : ['categoryBlogService', '$stateParams', function(categoryBlogService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return categoryBlogService.fetch($stateParams.id);
                                  }]
                                }
                          }
                        }
                    })
            .state('/.articles', {
                url: "articles",

                views: {
                    '':{
                        controller:'articleCtrl',
                        templateUrl:"/templates/backoffice/blog/articles.html"
                    }
                }
            })    
                    .state('/.articles.add', {
                        url: "/add",
                        views: {
                          '':{
                                controller:'addArticleCtrl',
                                templateUrl:"/templates/backoffice/blog/addarticle.html",
                                resolve:{
                                  category : ['categoryBlogService', '$stateParams', function(categoryBlogService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return categoryBlogService.list($stateParams.id);
                                  }]
                                }
                            }
                        }
                    })            
                    .state('/.articles.edit', {
                        url: "/edit/:id/:tabstate",
                        views: {
                          '':{
                            controller:'editArticleCtrl',
                            templateUrl:"/templates/backoffice/blog/editarticle.html",
                            resolve:{
                                category : ['categoryBlogService', '$stateParams', function(categoryBlogService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return categoryBlogService.list($stateParams.id);
                                  }],
                                authorlist : ['userService', '$stateParams', function(userService,$stateParams) {

                                    console.log('resolve authorlist');
                                    console.log($stateParams);
                                    // return true;
                                    return userService.getauthorlist($stateParams.id);
                                  }],
                                article:['articleService', '$stateParams',  function(articleService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return articleService.fetch($stateParams.id);
                                  }],
                            }
                          }
                        }
                    })

// PROJECTs            
            .state('/.categoriesProject', {
                url: "categoriesproject",

                views: {
                    '':{
                        controller:'categoryProjectCtrl',
                        templateUrl:"/templates/backoffice/projects/category.html"
                    }
                }
            })            
                    .state('/.categoriesProject.add', {
                        url: "/add",
                        views: {
                          '':{
                            controller:"addCategoryProjectCtrl",
                            templateUrl:"/templates/backoffice/projects/addcategory.html"
                            }
                        }
                    })            
                    .state('/.categoriesProject.edit', {
                        url: "/edit:id",
                        views: {
                          '':{
                            controller:'editCategoryProjectCtrl',
                            templateUrl:"/templates/backoffice/projects/editcategory.html",
                            resolve:{
                                  item : ['categoryProjectService', '$stateParams', function(categoryProjectService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return categoryProjectService.fetch($stateParams.id);
                                  }]
                                }
                          }
                        }
                    })
            .state('/.projects', {
                url: "projects",

                views: {
                    '':{
                        controller:'projectCtrl',
                        templateUrl:"/templates/backoffice/projects/projects.html"
                    }
                }
            })    
                    .state('/.projects.add', {
                        url: "/add",
                        views: {
                          '':{
                                controller:'addProjectCtrl',
                                templateUrl:"/templates/backoffice/projects/addproject.html",
                                resolve:{
                                  category : ['categoryProjectService', '$stateParams', function(categoryProjectService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return categoryProjectService.list($stateParams.id);
                                  }]
                                }
                            }
                        }
                    })            
                    .state('/.projects.edit', {
                        url: "/edit/:id/:tabstate",
                        views: {
                          '':{
                            controller:'editProjectCtrl',
                            templateUrl:"/templates/backoffice/projects/editproject.html",
                            resolve:{
                                category : ['categoryProjectService', '$stateParams', function(categoryProjectService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return categoryProjectService.list($stateParams.id);
                                  }],
                                authorlist : ['userService', '$stateParams', function(userService,$stateParams) {

                                    console.log('resolve authorlist');
                                    console.log($stateParams);
                                    // return true;
                                    return userService.getauthorlist($stateParams.id);
                                  }],
                                project:['projectService', '$stateParams',  function(projectService,$stateParams) {

                                    console.log('resolve');
                                    console.log($stateParams);
                                    // return true;
                                    return projectService.fetch($stateParams.id);
                                  }],
                            }
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
        .state('/.i18n', {
            url: "params/internationalisation/:lang",

            views: {
                '':{
                    controller : 'i18nCtrl',
                    templateUrl:"/templates/backoffice/params/i18n.html",
                    resolve:{traduction:['paramsService', '$stateParams',  function(paramsService,$stateParams) {

                        console.log('resolve');
                        console.log($stateParams);
                        // return true;
                        return paramsService.getTraductions($stateParams.lang);
                      }]
                    }
                }
            }
        })  
        .state('/.administration', {
            url: "params/administration",

            views: {
                '':{
                    controller : 'administrationCtrl',
                    templateUrl:"/templates/backoffice/params/administration.html",
                    resolve:{stockage:['paramsService', '$stateParams',  function(paramsService,$stateParams) {

                        console.log('resolve');
                        console.log($stateParams);
                        // return true;
                        return paramsService.getUploadsSize();
                      }],
                      version:['paramsService', '$stateParams',  function(paramsService,$stateParams) {

                        console.log('resolve');
                        console.log($stateParams);
                        // return true;
                        return paramsService.getVersion();
                      }],
                      dbstats:['paramsService', '$stateParams',  function(paramsService,$stateParams) {

                        console.log('resolve');
                        console.log($stateParams);
                        // return true;
                        return paramsService.getDbStats();
                      }]
                    }
                }
            }
        })  

}]);