app.controller('articleCtrl',['messageCenterService', '$scope', 'filterFilter', '$filter', '$state', '$stateParams', 'articleService', function articlesCtrl(messageCenterService,$scope,filterFilter,$filter,$state,$stateParams,articleService) {

	$scope.loading=true;
	$scope.loadingGraph2=true;
	$scope.newItemFlag=false;
	$scope.newItem={};
	console.log('articleController');
	document.body.scrollTop=0;
	$scope.list=articleService.articles;
	$scope.filter = articleService.filter;
	 $scope.selected={};
	 $scope.selectedFinishLoading=false;
    $scope.selected.description='';





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
		articleService.fetchAll().then(function(data) {
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
            $scope.data2 = _.pluck($scope.list,'nbArticles')
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
    	$state.go(".edit",{ id: id })
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
    	articleService.remove(id).then(function(data) {
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
		articleService.add($scope.newItem).then(function(data) {
			messageCenterService.add('success', 'Nouveau article ajouté', { status: messageCenterService.status.unseen ,timeout: 3000});
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

app.controller('addArticleCtrl',['imageService','tagService','$scope', 'filterFilter', '$filter', '$state', 'articleService', '$rootScope', 'messageCenterService','category','$modal', function addArticleCtrl(imageService,tagService,$scope,filterFilter,$filter,$state,articleService,$rootScope,messageCenterService,category,$modal) {
	document.body.scrollTop=0;
	console.log('category----->',category);
	$scope.categories=category;
	// $scope.isCollapsed=true;
	
	$scope.formData={};
	$scope.formData.content='';
	$scope.formData.description= '';
	$scope.formData.date= new Date();
	$scope.formData.status= 'draft';
	$scope.formData.tags= [];
	$scope.formData.images=[]


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
  	$scope.sortableOptions = {
  		// containment: "parent" ,
  		containment: "#page-wrapper" ,
  		'ui-floating':true,
	    update: function(e, ui) {
	     	// startIndex = ui.item.sortable.index;
	     	// dropIndex = ui.item.sortable.dropindex;
	     	// if(dropIndex<startIndex)
	     	// {
	     	// 	for(var i in $scope.galery.images)
	     	// 	{
	     			
	     	// 		if($scope.galery.images[i].index < startIndex && $scope.galery.images[i].index >=dropIndex)
	     	// 		{
	     	// 			$scope.galery.images[i].index = $scope.galery.images[i].index +1;
	     	// 			galeryService.updateImgIndex($scope.galery.images[i],$scope.galery);
	     	// 		}
	     	// 		else if($scope.galery.images[i].index == startIndex )
	     	// 		{
	     	// 			$scope.galery.images[i].index = dropIndex;
	     	// 			galeryService.updateImgIndex($scope.galery.images[i],$scope.galery);
	     	// 		}
	     			
	     	// 	}

	     	// }
	     	// if(dropIndex>startIndex)
	     	// {
	     	// 	for(var i in $scope.galery.images)
	     	// 	{
	     			
	     			
	     	// 		if($scope.galery.images[i].index >startIndex && $scope.galery.images[i].index <=dropIndex)
	     	// 		{
	     	// 			$scope.galery.images[i].index = $scope.galery.images[i].index -1;
	     	// 			galeryService.updateImgIndex($scope.galery.images[i],$scope.galery);
	     	// 		}
	     	// 		else if($scope.galery.images[i].index == startIndex)
	     	// 		{
	     	// 			$scope.galery.images[i].index = dropIndex;
	     	// 			galeryService.updateImgIndex($scope.galery.images[i],$scope.galery);
	     	// 		}
	     			
	     	// 	}

	     	// }
	     	

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
  	$scope.autocompleteTag = function(query) {
        console.log('query',query);
        return tagService.autocomplete(query);
    };
  	$scope.submit = function() {
        console.log('submit');
       
    };
	$scope.addArticle=function(stay) {
		console.log('ADDNEW Article');
		var rep = articleService.add($scope.formData).then(function(data) { 
				// $state.go('/.categoriesBlog');
				$scope.reload();
				messageCenterService.add('success', 'Article ajouté', { status: messageCenterService.status.next ,timeout: 3000});
				if(stay=='close')
					$state.go("/.articles")
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMaddNewArticle[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);
app.controller('editArticleCtrl',['$scope', 'filterFilter', '$filter', '$state', 'articleService', '$rootScope', 'messageCenterService','item', function addArticleCtrl($scope,filterFilter,$filter,$state,articleService,$rootScope,messageCenterService,item) {
	document.body.scrollTop=0;
	// $scope.isCollapsed=true;
	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	};
	$scope.formData=item;
	

	console.log($scope.formData.color);

	$scope.setFormScope= function(scope){
       $scope.formScope = scope;
    }

	$scope.edit=function() {
		console.log('ADDNEW Ctrl');
		articleService.edit($scope.formData).then(function(data) { 
				$state.go('/.categoriesBlog');
				$scope.reload();
				messageCenterService.add('success', 'Catégorie ajoutée', { status: messageCenterService.status.next ,timeout: 3000});
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				if(data==="exist"){
					
						 $scope.formScope.FORMaddNewArticle.name.$setValidity('uniquename', false);
				}
				else
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMaddNewArticle[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);