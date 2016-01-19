app.controller('projectCtrl',['messageCenterService', '$scope', 'filterFilter', '$filter', '$state', '$stateParams', 'projectService', function projectsCtrl(messageCenterService,$scope,filterFilter,$filter,$state,$stateParams,projectService) {

	$scope.loading=true;
	$scope.loadingGraph2=true;
	$scope.newItemFlag=false;
	$scope.newItem={};
	console.log('projectController');
	document.body.scrollTop=0;
	$scope.list=projectService.projects;
	$scope.filter = projectService.filter;
	 $scope.selected={};
	 $scope.selectedFinishLoading=false;
    $scope.selected.description='';


    document.body.scrollTop=0


    $scope.select=function (argument) {
        console.log(argument);
        $scope.selected=null;
        $scope.selectedFinishLoading=false;
        for(var i in $scope.list){
            $scope.list[i].selected=false;

        }
        $scope.list[argument].selected=true;
         $scope.selected=$scope.list[argument];
         // $scope.selected.description = $scope.selected.description || '';
         document.body.scrollTop=0;
    }
	$scope.reload= function () {
		$scope.loading=true;
		// $scope.loadingGraph2=true;
		projectService.fetchAll().then(function(data) {
			$scope.list = data.data ;
			$scope.total = data.total ;
			console.log($scope.total);
			$scope.nbpage = Math.ceil(data.total/3);
			var olderSelection=false;
            // if($scope.selected)
            // {
            //     console.log('selectedFile', $scope.selected);
                
            //     for(var i=0; i< $scope.list.length;i++)
            //     {
            //         if($scope.list[i].id === $scope.selected.id){
            //             $scope.selected=$scope.list[i];
            //             $scope.list[i].selected=true;
            //             olderSelection=true;
            //         }

            //     }
               
            // }
            // if(!olderSelection && $scope.list.length)
            // {
            //     $scope.list[0].selected=true;
            //     $scope.selected = $scope.list[0];
            // }
            $scope.data2 = _.pluck($scope.list,'nbProjects')
            $scope.labels2 = _.pluck($scope.list,'name')
            $scope.colors2 = _.pluck($scope.list,'color')
            

            $scope.loadingGraph2=false;
			$scope.loading=false;
			document.body.scrollTop=0;
		},function(err) {
			console.log(err);
			$scope.loading=false;
		});

		
		

	}
	$scope.reload();

	$scope.edit = function(id) {
    	$state.go("/.projects.edit",{ id: id , tabstate:'info' })
    	clearSelection()
  	};
	$scope.pageChanged = function() {
    	$scope.reload()
  	};
	$scope.setOrder = function(val) {
    	$scope.filter.order=val;
    	$scope.reload()
  	};
	$scope.remove = function(id) {
    	projectService.remove(id).then(function(data) {
    		messageCenterService.add('success', 'Tag supprimé', { status: messageCenterService.status.unseen ,timeout: 3000});
			$scope.reload()
		},function(err) {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
			console.log(err);
		});
  	};
	$scope.cancelNew = function(id) {
    	$scope.newItemFlag=false;
    	$scope.newItem={};
  	};
	$scope.addNew = function(id) {
		projectService.add($scope.newItem).then(function(data) {
			messageCenterService.add('success', 'Nouveau projet ajouté', { status: messageCenterService.status.unseen ,timeout: 3000});
			$scope.reload()
		},function(err) {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
			console.log(err);
		});
    	$scope.newItemFlag=false;
  	};
	


  	$scope.myoptions2 = {responsive:true,maintainAspectRatio: false,scaleShowGridLines : false,height:300}
  	

	
	

}]);

app.controller('ModalInstanceImagesCtrl',['$scope', '$modalInstance','imageService', function ($scope, $modalInstance,imageService) {

  
	$scope.selectedImage=null;
	$scope.selectedImageIndex=null;
    $scope.loadingImages=true;
    // $scope.images=imageService.images;
    $scope.filter = imageService.filter;
    $scope.reloadImages= function () {
        $scope.loadingImages=true;
        $scope.users = imageService.fetch().then(function(data) {
            $scope.images = data.images ;
            $scope.total = data.total ;
            $scope.loadingImages=false;
            console.log('images',$scope.images);
            document.body.scrollTop=0;
        },function(err) {
            console.log(err);
        });
    }
    $scope.reloadImages();
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.filter.page);
        $scope.reloadImages()
    };
	$scope.loadImage=function (index) {
       console.log("loadImage",index);

       $scope.$apply(function () {
           $scope.images[index].finishloading=true;
       })

   }
   $scope.selectImg=function (argument) {
   		if($scope.selectedImageIndex==argument)
   		{
   			$modalInstance.close($scope.selectedImage);
   		}else{
        	$scope.selectedImage=null;
        	for(var i in $scope.images){
            $scope.images[i].selected=false;

        	}
        	$scope.images[argument].selected=true;
         	$scope.selectedImage=$scope.images[argument];
         	$scope.selectedImageIndex=argument;
   		}
    }
	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);

app.controller('ModalInstanceDocsCtrl',['$scope', '$modalInstance','documentService', function ($scope, $modalInstance,documentService) {

  
	$scope.selectedDocument=null;
	$scope.selectedDocumentIndex=null;
    $scope.loadingDocuments=true;
    // $scope.documents=documentService.documents;
    $scope.filter = documentService.filter;
    $scope.reloadDocuments= function () {
        $scope.loadingDocuments=true;
        $scope.documents = documentService.fetch().then(function(data) {
        	console.log(data);
            $scope.documents = data.data ;
            $scope.total = data.total ;
            $scope.loadingDocuments=false;
            console.log('documents',$scope.documents);
            document.body.scrollTop=0;
        },function(err) {
            console.log(err);
        });
    }
    $scope.reloadDocuments();
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.filter.page);
        $scope.reloadDocuments()
    };

   $scope.selectImg=function (argument) {
   		if($scope.selectedDocumentIndex==argument)
   		{
   			$modalInstance.close($scope.selectedDocument);
   		}else{
        	$scope.selectedDocument=null;
        	for(var i in $scope.documents){
            $scope.documents[i].selected=false;

        	}
        	$scope.documents[argument].selected=true;
         	$scope.selectedDocument=$scope.documents[argument];
         	$scope.selectedDocumentIndex=argument;
   		}
    }
	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);

app.controller('addProjectCtrl',['imageService','tagService','$scope', 'filterFilter', '$filter', '$state', 'projectService', '$rootScope', 'messageCenterService','category','$modal', function addProjectCtrl(imageService,tagService,$scope,filterFilter,$filter,$state,projectService,$rootScope,messageCenterService,category,$modal) {
	document.body.scrollTop=0;
	console.log('category----->',category);
	$scope.categories=category;
	// $scope.isCollapsed=true;
	
	$scope.formData={};
	$scope.formData.content='';
	$scope.formData.description= '';
	$scope.formData.date= new Date();
  $scope.formData.status= 'draft';
	$scope.formData.evenement= 'article';
	$scope.formData.tags= [];
	$scope.formData.images=[]
	$scope.formData.documents=[]
	$scope.formData.publishVideo=false;
	$scope.formData.activeComent=true;


	$scope.removeimage=function(index) {
		$scope.formData.images.splice(index,1);
	};
	$scope.removedocument=function(index) {
		$scope.formData.documents.splice(index,1);
	};

  $scope.openImages = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'templates/backoffice/media/modalImages.html',
      controller: 'ModalInstanceImagesCtrl',
      size: size,
      // resolve: {
      //   imageService: function () {
      //     return imageService;
      //   }
      // }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.formData.images.push(selectedItem);
      // console.log($scope.img);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openDocuments = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'templates/backoffice/media/modalDocs.html',
      controller: 'ModalInstanceDocsCtrl',
      size: size,
      // resolve: {
      //   imageService: function () {
      //     return imageService;
      //   }
      // }
    });

    modalInstance.result.then(function (selectedItem) {
      	$scope.formData.documents.push(selectedItem);
      	window.scroll(0,findPos(document.getElementById("divDocument")));
    }, function () {
      	window.scroll(0,findPos(document.getElementById("divDocument")));
    });
  };
  	$scope.sortableOptions = {
  		// containment: "parent" ,
  		containment: "#page-wrapper" ,
  		'ui-floating':true,
  		items: "li:not(.not-sortable)",
	    update: function(e, ui) {
	     
		},
		sort:function() {
		},
		out:function() {
		},
		start:function(e,ui) {
		}
  	};  
  	$scope.sortableOptions2 = {
  		// containment: "parent" ,
  		containment: "#page-wrapper" ,
  		'ui-floating':true,
  		items: "li:not(.not-sortable)",
	    update: function(e, ui) {
	     
		},
		sort:function() {
		},
		out:function() {
		},
		start:function(e,ui) {
		}
  	};

	$scope.setFormScope= function(scope){
       $scope.formScope = scope;
    }
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
    $scope.open1 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened1 = true;
    };
    $scope.open2 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened2 = true;
	  };
  	$scope.autocompleteTag = function(query) {
        console.log('query',query);
        return tagService.autocomplete(query);
    };
	$scope.addProject=function(stay) {
    console.log('ADDNEW Project');
		console.log('$scope.formData',$scope.formData);
		var rep = projectService.add($scope.formData).then(function(data) { 
				$scope.reload();
				messageCenterService.add('success', 'Project ajouté', { status: messageCenterService.status.next ,timeout: 3000});
				if(stay=='close'){
          $state.go("/.projects")
        }
        else
        {
          // ,data[0].id
          $state.go("/.projects.edit",{id:data[0].id})
        }
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				document.body.scrollTop=0;
					messageCenterService.add('danger', 'Veuillez vérifier votre saisie', { status: messageCenterService.status.next ,timeout: 3000});
				
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
							
						for(var i in data.error.invalidAttributes[attr]){

							$scope.formScope.FORMaddNewProject[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);
app.controller('editProjectCtrl',['$location','imageService','tagService','$scope', 'filterFilter', '$filter', '$state','$stateParams', 'projectService', '$rootScope', 'messageCenterService','category','$modal','project','authorlist','configService', function addProjectCtrl($location,imageService,tagService,$scope,filterFilter,$filter,$state,$stateParams,projectService,$rootScope,messageCenterService,category,$modal,project,authorlist,configService) {
	document.body.scrollTop=0;
  
  $scope.categories=category;
	$scope.authorlist=authorlist;
  $scope.projectlangues={}
  $scope.langs = angular.copy(configService.languages)
  $scope.projectlangues =  _.remove($scope.langs,function(n) {return n.lang != configService.defaultLanguage})

  _.map(project.translations,function(transla) {
    var index = _.findIndex($scope.projectlangues,function(n) {return n.lang == transla.lang})
    if(index>=0){
    $scope.projectlangues[index].exist=true;
    $scope.projectlangues[index].item=transla;
    }
  })

  $scope.currenttabs=[];
  $scope.commentLimit=5;
	$scope.formData=project;
	 
	// $scope.formData.category='551d3d28b916988729a976af'
  $scope.formData.video= $scope.formData.video || '';
	$scope.formData.content= $scope.formData.content || '';
	$scope.formData.description= $scope.formData.description || '';
	$scope.formData.tags= $scope.formData.tags || [];
	// $scope.formData.images= [];
	// $scope.formData.documents= [];
	$scope.formData.publishVideo= $scope.formData.publishVideo || false;
	$scope.formData.activeComent= $scope.formData.activeComent 
	$scope.formData.status= $scope.formData.status || 'draft';
	// $scope.formData.category= $scope.formData.category.id || '';
	// $scope.formData.description= '';
  $scope.formData.date= $scope.formData.date || '';
  $scope.formData.start= $scope.formData.start || '';
	$scope.formData.end= $scope.formData.end || '';
	// if(project.category)
	// 	$scope.formData.category= project.category.id || '';
	// else	
	// 	$scope.formData.category= '';
	// $scope.formData.status= 'draft';
	// $scope.formData.tags= [];
	// $scope.formData.images=[]
	// $scope.formData.documents=[]
	// $scope.formData.publishVideo=false;
	// $scope.formData.activeComent=true;
  $scope.showMore=function() {
    $scope.commentLimit= $scope.commentLimit+5
  }
	$scope.formData.images= _.sortBy($scope.formData.images,function(n) {
    return Number(n.rank);
  });
  $scope.formData.comments= _.sortBy($scope.formData.comments,function(n) {
	  return Number(n.createdAt);
	});
  $scope.formData.documents= _.sortBy($scope.formData.documents,function(n) {
    return Number(n.rank);
  });
  $scope.newComment={};
  $scope.currenttabs[''+$stateParams.tabstate]= true;
  // console.log($scope.currenttabs);
  $scope.alertMe = function(state) {
    console.log('alertme '+ state);
    $scope.currenttabs[''+state]= true;
    $stateParams.tabstate=state
    // console.log($stateParams.tabstate);
    // console.log(window.location);
    // console.log( $location.path().substring(0,$location.path().lastIndexOf('/'))+'/'+$stateParams.tabstate);
    // window.location.hash= window.location.hash.substring(0,window.location.hash.lastIndexOf('/'))+'/'+$stateParams.tabstate;
  };
  $scope.removeCommentMe=function(com) {
      $scope.formData.comments.splice($scope.formData.comments.indexOf(com),1)
  };
  $scope.removeReponseMe=function(com,rep) {
      com.reponses.splice(com.reponses.indexOf(rep),1)
  };
  $scope.addTrad=function(langage) {
      langage.exist = true;
      var newtrad ={};
      newtrad.lang=langage.lang;
      newtrad.content='';
      langage.item=newtrad
      // $scope.formData.traductions.push(newtrad)

  };
  $scope.removeTrad=function(langage) {
      langage.exist = false;
      delete langage.item;
      $scope.$apply();
  };
  $scope.addNewComment=function() {
      $scope.newComment.author = 'MOI moi';
      $scope.newComment.createdAt = new Date().toString();
      $scope.newComment.email = 'yoyoyoyoyoyo@email.fr';
      $scope.newComment.status = 'new';
      $scope.newComment.nouvo = true;
      if($scope.newComment.content)
        $scope.formData.comments.unshift($scope.newComment)

      $scope.newComment={}
  };
  $scope.addNewRep=function(comment) {
      if(comment.reponses==null)
        comment.reponses=[]
      comment.newComment.author = 'MOI moi';
      comment.newComment.createdAt = new Date().toString();
      comment.newComment.email = 'yoyoyoyoyoyo@email.fr';
      comment.newComment.status = 'new';
      comment.newComment.nouvo = true;
      console.log(comment);
      if(comment.newComment.content)
        comment.reponses.unshift(comment.newComment)
      
      comment.newComment={}
      comment.openrepondre=false;
  };
  $scope.openrepondre=function(comment,elem) {
      comment.openrepondre= true;
  };

	$scope.removeimage=function(index) {
		$scope.formData.images.splice(index,1);
	};
	$scope.removedocument=function(index) {
		$scope.formData.documents.splice(index,1);
	};

  $scope.openImages = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'templates/backoffice/media/modalImages.html',
      controller: 'ModalInstanceImagesCtrl',
      size: size,
      // resolve: {
      //   imageService: function () {
      //     return imageService;
      //   }
      // }
    });

    modalInstance.result.then(function (selectedItem) {
    	var d = {};
    	d.nouvo=true;
    	d.image=selectedItem
      	$scope.formData.images.push(d);
      // console.log($scope.img);
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.openDocuments = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'templates/backoffice/media/modalDocs.html',
      controller: 'ModalInstanceDocsCtrl',
      size: size,
      // resolve: {
      //   imageService: function () {
      //     return imageService;
      //   }
      // }
    });

    modalInstance.result.then(function (selectedItem) {
      	var d = {};
    	d.nouvo=true;
    	d.document=selectedItem
      	$scope.formData.documents.push(d);
      	window.scroll(0,findPos(document.getElementById("divDocument")));
    }, function () {
      	window.scroll(0,findPos(document.getElementById("divDocument")));
    });
  };
  	$scope.sortableOptions = {
  		// containment: "parent" ,
  		containment: "#page-wrapper" ,
  		'ui-floating':true,
  		items: "li:not(.not-sortable)",
	    update: function(e, ui) {
	     
		},
		sort:function() {
		},
		out:function() {
		},
		start:function(e,ui) {
		}
  	};  
  	$scope.sortableOptions2 = {
  		// containment: "parent" ,
  		containment: "#page-wrapper" ,
  		'ui-floating':true,
  		items: "li:not(.not-sortable)",
	    update: function(e, ui) {
	     
		},
		sort:function() {
		},
		out:function() {
		},
		start:function(e,ui) {
		}
  	};

	$scope.setFormScope= function(scope){
       $scope.formScope = scope;
    }
    $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

    $scope.open1 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened1 = true;
    };
    $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

  	$scope.autocompleteTag = function(query) {
        console.log('query',query);
        return tagService.autocomplete(query);
    };
	$scope.editProject=function(stay) {
    $scope.formData.translations=_.compact(_.pluck($scope.projectlangues,'item'))
		var rep = projectService.edit($scope.formData).then(function(data) { 
				// $state.go('/.categoriesBlog');
				$scope.reload();
				messageCenterService.add('success', 'Projet enregisté', { status: messageCenterService.status.next ,timeout: 3000});
				if(stay=='close')
					$state.go("/.projects")
				else{
					$scope.formData=data;
					// $scope.formData.category='551d3d28b916988729a976af'
          $scope.formData.video= $scope.formData.video || '';
					$scope.formData.content= $scope.formData.content || '';
					$scope.formData.description= $scope.formData.description || '';
					$scope.formData.tags= $scope.formData.tags || [];
          $scope.formData.images= $filter('orderBy')($scope.formData.images, 'rank', false)
					$scope.formData.documents= $filter('orderBy')($scope.formData.documents, 'rank', false)
					// $scope.formData.documents= [];
					$scope.formData.publishVideo= $scope.formData.publishVideo || false;
					$scope.formData.activeComent= $scope.formData.activeComent;
          $scope.formData.status= $scope.formData.status || 'draft';
					// $scope.formData.status= $scope.formData.activeComent || true;
					// $scope.formData.category= $scope.formData.category.id || '';
					// $scope.formData.description= '';
          $scope.formData.date= $scope.formData.date || '';
          $scope.formData.start= $scope.formData.start || '';
					$scope.formData.end= $scope.formData.end || '';
				}
				document.body.scrollTop=0;
		},function(data) {
				document.body.scrollTop=0;
					messageCenterService.add('danger', 'Veuillez vérifier votre saisie', { status: messageCenterService.status.next ,timeout: 3000});
				
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
							
						for(var i in data.error.invalidAttributes[attr]){

							$scope.formScope.FORMeditProject[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);