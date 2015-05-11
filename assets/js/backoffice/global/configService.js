app.factory('configService', ['$http', '$q', function ($http,$q) {
    var service = {};
    service.frontConfig={};
    console.log('configService');
    service.h1 = 'Administration - Nutrimarketing';
    service.url = 'http://nutrimarketing.eu';
    // service.frontConfig={
    //     imageResize:{
    //         article:[
    //             {  
    //                 'title':'Preview site',
    //                 'folder':'thumbs',
    //                 'width': 870,
    //                 'height':390
    //             },{  
    //                 'title':'Format mobile',
    //                 'folder':'thumbs3',
    //                 'width': 400,
    //                 'height':400
    //                 }
    //         ],
    //         articleCategory:[
    //             {  
    //                 'title':'Entête de catégorie',
    //                 'folder':'thumbs',
    //                 'width': 870,
    //                 'height':390
    //             }
    //         ],
    //         project:[
    //             {  
    //                 'title':'Miniature',
    //                 'folder':'thumbs',
    //                 'width': 560,
    //                 'height':315
    //             }
    //         ],
    //         projectCategory:[
    //             {  
    //                 'title':'Entête de catégorie',
    //                 'folder':'thumbs',
    //                 'width': 400,
    //                 'height':400
    //             }
    //         ],
    //         homeGalery:[
    //             {  
    //                 'title':'Image principale',
    //                 'folder':'homeSlider',
    //                 'width': 500,
    //                 'height':500
    //             }
    //         ],
    //         ingredient:[
    //             {  
    //                 'title':'Image principale',
    //                 'folder':'ingredients',
    //                 'width': 500,
    //                 'height':500
    //             }
    //         ],
    //         profilepicture:[
    //             {  
    //                 'title':'Image principale',
    //                 'folder':'profilepicture',
    //                 'width': 500,
    //                 'height':500
    //             },{  
    //                 'title':'Miniature',
    //                 'folder':'thumbs',
    //                 'width': 100,
    //                 'height':100
    //             }
    //         ],
    //     }
    // }
    // service.maintabs=[
    // {'title':'Dashboard','name' :'dashboard','active':false,'viewName':'dashboardView'},
    // {'title':'Utilisateurs','name' :'users','active':false,'viewName':'usersView'},
    // {'title':'Blog','name' :'articles','active':false,'viewName':'allarticlesView'},
    // {'title':'Noeuds','name' :'projects','active':false,'viewName':'projetsView'},
    // // {'title':'Galerie d\'images','name' :'galery','active':false,'viewName':'galeryView'},
    // // {'title':'Livre d\'or','name' :'goldenbook','active':false,'viewName':'goldenbookView'},
    // // {'title':'Newsletters','name' :'newsletters','active':false,'viewName':'newslettersView'},
    // // {'title':'Gestion des flux','name' :'fluxs','active':false,'viewName':'fluxsView'},
    // // {'title':'Ingrédients & Fabricans','name' :'food','active':false,'viewName':'foodView'},
    // // {'title':'Forum','name' :'forum','active':false,'viewName':'forumView'},
    // ];
    // service.foodtabs=[
    // {'title':'Ingrédients','name' :'ingredients','active':false},
    // {'title' :'Fabricans','name' :'fabricans','active':false},
    // ];
    // service.articlestabs=[
    // {'title':'Articles','name' :'articles','active':false},
    // {'title' :'Catégories','name' :'category','active':false},
    // {'title':'Commentaires','name' :'coments','active':false}
    // ];
    // service.projectstabs=[
    // {'title':'Noeud','name' :'projects','active':false},
    // {'title' :'Catégories','name' :'category','active':false},
    // ];
    // service.galerytabs=[
    // {'title':'Page d\'accueil','name' :'home','active':false},
    // ];
    // service.userstabs=[
    // {'title':'Utilisateurs internes','name' :'user','active':false},
    // // {'title':'Clients','name' :'client','active':false},
    // ];
    // service.newsletterstabs=[
    // {'title':'Mes listes','name' :'list','active':false},
    // {'title':'Envoie de mail','name' :'envoi','active':false},
    // ];

    service.sizequota=3200000000;
    service.defaultLanguage=['fr'];
    service.languages=[
    {lang:'fr',langfull:'Francais',langcap:'FR'},
    {lang:'en',langfull:'Anglais',langcap:'EN'},
    {lang:'de',langfull:'Allemand',langcap:'DE'},
    {lang:'es',langfull:'Espagnole',langcap:'ES'}
    ];

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

    return service;
}]);