app.controller('tagsCtrl',['messageCenterService', '$scope', 'filterFilter', '$filter', '$state', '$stateParams', 'tagService', function tagsCtrl(messageCenterService,$scope,filterFilter,$filter,$state,$stateParams,tagService) {

	$scope.loading=true;
	$scope.newItemFlag=false;
	$scope.newItem={};
	console.log('tagController');
	document.body.scrollTop=0;
	$scope.list=tagService.tags;
	$scope.loading=false;
	$scope.filter = tagService.filter;
	 $scope.selected={};
	 $scope.selectedFinishLoading=false;
    $scope.selected.description='';
    $scope.test='tttttttt';





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
		tagService.fetchAll().then(function(data) {
			$scope.list = data.data ;
			$scope.total = data.total ;
			console.log($scope.total);
			$scope.nbpage = Math.ceil(data.total/3);
			var olderSelection=false;
            if($scope.selected)
            {
                console.log('selectedFile', $scope.selected);
                
                for(var i=0; i< $scope.list.length;i++)
                {
                    if($scope.list[i].id === $scope.selected.id){
                        $scope.selected=$scope.list[i];
                        $scope.list[i].selected=true;
                        olderSelection=true;
                    }

                }
               
            }
            if(!olderSelection && $scope.list.length)
            {
                $scope.list[0].selected=true;
                $scope.selected = $scope.list[0];
            }

			$scope.loading=false;
			document.body.scrollTop=0;
		},function(err) {
			console.log(err);
			$scope.loading=false;
		});

		
		

	}
	$scope.reload();
	$scope.pageChanged = function() {
    	$scope.reload()
  	};
	$scope.setOrder = function(val) {
    	$scope.filter.order=val;
    	$scope.reload()
  	};
	$scope.remove = function(id) {
    	tagService.remove(id).then(function(data) {
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
		console.log($scope.newItem);
		tagService.add($scope.newItem).then(function(data) {
			messageCenterService.add('success', 'Nouveau tag ajouté', { status: messageCenterService.status.unseen ,timeout: 3000});
			$scope.reload()
		},function(err) {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
			console.log(err);
		});
    	$scope.newItemFlag=false;
  	};
	

	// $scope.loadGraph=function (mode) {
	// 	$scope.loadingGraph=true;
	// 	// $scope.labels=[]
	// 	// $scope.data=[]
	// 	var labels = [];
	// 	var datas = [];
	// 	datas[0]=[];
	// 	datas[1]=[];
	// 	tagService.loadGraph(mode).then(function (data) {
	// 		console.log(data);

	// 		for(var i in data){
	// 			labels.push(data[i].label);
	// 			datas[0].push(data[i].tagData +data[i].memberData)
	// 			datas[1].push(data[i].memberData)
	// 		}
	// 		console.log(labels);
	// 		console.log(datas);
	// 		$scope.labels = labels.reverse();
	// 		datas[0] = datas[0].reverse()
	// 		datas[1] = datas[1].reverse()
	// 		$scope.loadingGraph=false;
	// 		$scope.data=datas
			
			
	// 	})
	// }
	// $scope.loadGraph('full');
	// $scope.loadGraph2=function (mode) {
	// 	$scope.loadingGraph2=true;
	// 	// $scope.labels=[]
	// 	// $scope.data=[]
	// 	var datas = [];
		
	// 	tagService.loadGraph2(mode).then(function (data) {
			
	// 		$scope.loadingGraph2=false;
	// 		$scope.data2=data
			
			
	// 	})
	// }
	// $scope.loadGraph2('all');

 // 	$scope.labels = [];
 //  	$scope.series = ['Utilisateur', 'Membre'];
 //  	$scope.myoptions = {scaleBeginAtZero : true,responsive:true,maintainAspectRatio: true,scaleShowGridLines : false,}
 //  	$scope.colors = [{fillColor: "rgba(0,0,0,0.2)",pointColor: "#555",pointHighlightFill: "grey",pointHighlightStroke: "#555",pointStrokeColor: "white",strokeColor: "#555"},{fillColor: "lightgreen",pointColor: "green",pointHighlightFill: "lightgreen",pointHighlightStroke: "darkgreen",pointStrokeColor: "white",strokeColor: "green"}];
 //  	$scope.data = [];
	//   $scope.onClick = function (points, evt) {
	//     console.log(points, evt);
	//   };

 // 	// $scope.labels2 = [];
 //  	$scope.labels2 = ['Aujourd\'hui','Il y à moins d\'une semaine', 'Il y à moins d\'un mois','Il y à moins de 6 mois','Il y à plus de 6 mois'];
 //  	$scope.myoptions2 = {responsive:true,maintainAspectRatio: false,scaleShowGridLines : false,height:300}
 //  	$scope.colors2 = ['#006600','#00AA00','#5cb85c','#FF7E00','#AF002A'];
 //  	$scope.data2 = [56,89,15,75,23];
	//   $scope.onClick2 = function (points, evt) {
	//     console.log(points, evt);
	//   };

	
	

}]);


