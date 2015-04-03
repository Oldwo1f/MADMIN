app.controller('categoryBlogCtrl',['messageCenterService', '$scope', 'filterFilter', '$filter', '$state', '$stateParams', 'categoryBlogService', function categoryBlogsCtrl(messageCenterService,$scope,filterFilter,$filter,$state,$stateParams,categoryBlogService) {

	$scope.loading=true;
	$scope.loadingGraph2=true;
	$scope.newItemFlag=false;
	$scope.newItem={};
	console.log('categoryBlogController');
	document.body.scrollTop=0;
	$scope.list=categoryBlogService.categoryBlogs;
	$scope.loading=false;
	$scope.filter = categoryBlogService.filter;
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
		categoryBlogService.fetchAll().then(function(data) {
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
    	categoryBlogService.remove(id).then(function(data) {
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
		categoryBlogService.add($scope.newItem).then(function(data) {
			messageCenterService.add('success', 'Nouveau categoryBlog ajouté', { status: messageCenterService.status.unseen ,timeout: 3000});
			$scope.reload()
		},function(err) {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
			console.log(err);
		});
    	$scope.newItemFlag=false;
  	};
	


  	$scope.myoptions2 = {responsive:true,maintainAspectRatio: false,scaleShowGridLines : false,height:300}
  	

	
	

}]);



app.controller('addCategoryBlogCtrl',['$scope', 'filterFilter', '$filter', '$state', 'categoryBlogService', '$rootScope', 'messageCenterService', function addCategoryBlogCtrl($scope,filterFilter,$filter,$state,categoryBlogService,$rootScope,messageCenterService) {
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
	$scope.formData={};
	$scope.formData.textColor='white';
	$scope.formData.color= getRandomColor();

	console.log($scope.formData.color);

	$scope.setFormScope= function(scope){
       $scope.formScope = scope;
    }

	$scope.add=function() {
		console.log('ADDNEW Ctrl');
		var rep = categoryBlogService.add($scope.formData).then(function(data) { 
				$state.go('/.categoriesBlog');
				$scope.reload();
				messageCenterService.add('success', 'Catégorie ajoutée', { status: messageCenterService.status.next ,timeout: 3000});
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				if(data==="exist"){
					
						 $scope.formScope.FORMaddNewCategoryBlog.name.$setValidity('uniquename', false);
				}
				else
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMaddNewCategoryBlog[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);
app.controller('editCategoryBlogCtrl',['$scope', 'filterFilter', '$filter', '$state', 'categoryBlogService', '$rootScope', 'messageCenterService','item', function addCategoryBlogCtrl($scope,filterFilter,$filter,$state,categoryBlogService,$rootScope,messageCenterService,item) {
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
		categoryBlogService.edit($scope.formData).then(function(data) { 
				$state.go('/.categoriesBlog');
				$scope.reload();
				messageCenterService.add('success', 'Catégorie ajoutée', { status: messageCenterService.status.next ,timeout: 3000});
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				if(data==="exist"){
					
						 $scope.formScope.FORMaddNewCategoryBlog.name.$setValidity('uniquename', false);
				}
				else
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMaddNewCategoryBlog[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);