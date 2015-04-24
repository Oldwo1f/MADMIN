app.controller('categoryProjectCtrl',['messageCenterService', '$scope', 'filterFilter', '$filter', '$state', '$stateParams', 'categoryProjectService', function categoryProjectsCtrl(messageCenterService,$scope,filterFilter,$filter,$state,$stateParams,categoryProjectService) {

	$scope.loading=true;
	$scope.loadingGraph2=true;
	$scope.newItemFlag=false;
	$scope.newItem={};
	console.log('categoryProjectController');
	document.body.scrollTop=0;
	$scope.list=categoryProjectService.categoryProjects;
	console.log($scope.list);
	$scope.loading=false;
	$scope.filter = categoryProjectService.filter;
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
		categoryProjectService.fetchAll().then(function(data) {
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
    	$state.go("/.categoriesProject.edit",{ id: id})
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
    	categoryProjectService.remove(id).then(function(data) {
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
		categoryProjectService.add($scope.newItem).then(function(data) {
			messageCenterService.add('success', 'Nouveau categoryProject ajouté', { status: messageCenterService.status.unseen ,timeout: 3000});
			$scope.reload()
		},function(err) {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
			console.log(err);
		});
    	$scope.newItemFlag=false;
  	};
	


  	$scope.myoptions2 = {responsive:true,maintainAspectRatio: false,scaleShowGridLines : false,height:300}
  	

	
	

}]);



app.controller('addCategoryProjectCtrl',['$scope', 'filterFilter', '$filter', '$state', 'categoryProjectService', '$rootScope', 'messageCenterService', function addCategoryProjectCtrl($scope,filterFilter,$filter,$state,categoryProjectService,$rootScope,messageCenterService) {
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
		var rep = categoryProjectService.add($scope.formData).then(function(data) { 
				$state.go('/.categoriesProject');
				$scope.reload();
				messageCenterService.add('success', 'Catégorie ajoutée', { status: messageCenterService.status.next ,timeout: 3000});
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				if(data==="exist"){
					
						 $scope.formScope.FORMaddNewCategoryProject.name.$setValidity('uniquename', false);
				}
				else
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMaddNewCategoryProject[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);
app.controller('editCategoryProjectCtrl',['$scope', 'filterFilter', '$filter', '$state', 'categoryProjectService', '$rootScope', 'messageCenterService','item','configService', function addCategoryProjectCtrl($scope,filterFilter,$filter,$state,categoryProjectService,$rootScope,messageCenterService,item,configService) {
	document.body.scrollTop=0;


	$scope.articlelangues={}
	$scope.langs = angular.copy(configService.languages)
	$scope.articlelangues =  _.remove($scope.langs,function(n) {return n.lang != configService.defaultLanguage})
	_.map(item.translations,function(transla) {
		var index = _.findIndex($scope.articlelangues,function(n) {return n.lang == transla.lang})
		if(index>=0){
			$scope.articlelangues[index].exist=true;
			$scope.articlelangues[index].item=transla;
		}
	})



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
		$scope.formData.translations=_.compact(_.pluck($scope.articlelangues,'item'))
		categoryProjectService.edit($scope.formData).then(function(data) { 
				$state.go('/.categoriesProject');
				$scope.reload();
				messageCenterService.add('success', 'Catégorie ajoutée', { status: messageCenterService.status.next ,timeout: 3000});
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				if(data==="exist"){
					
						 $scope.formScope.FORMaddNewCategoryProject.name.$setValidity('uniquename', false);
				}
				else
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMaddNewCategoryProject[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);