app.controller('dashboardCtrl',['$scope', 'filterFilter', '$filter', '$state', '$stateParams', 'userService','chiffres','dashboardService','NewComments','notifications','socials',function usersCtrl($scope,filterFilter,$filter,$state,$stateParams,userService,chiffres,dashboardService,NewComments,notifications,socials) {
console.log('dashboardCtrl');
$scope.loadingGraph=true;
$scope.analytics=true;
$scope.loadingLabels=true;
	$scope.chiffres = chiffres;
$scope.count={};
$scope.pageNotif=0;
$scope.notifications=notifications;
$scope.socials=socials;
console.log(NewComments);
$scope.nbNewComments=0;
if(typeof(NewComments)=="object")
$scope.nbNewComments = NewComments.count;
$scope.metric='ga:sessions';
$scope.period='lastweek';
$scope.previousperiod='';
$scope.count.avgSessionDuration=0;
$scope.endNotif=false;
$scope.numberssss=1515;


$scope.loadNotif =function () {
	console.log('loadNotif');
	$scope.pageNotif++;
	console.log($scope.pageNotif);
	dashboardService.getNotifications($scope.pageNotif).then(function (data) {
		// body...
		if(data.length<10)
			$scope.endNotif=true;
		$scope.notifications= _.union($scope.notifications,data)
	})
	
}

$scope.goTolastComment =function () {
	
	console.log(NewComments.lastitem);
	if(typeof(NewComments.lastitem.comment)=='object'){
		
		if(typeof(NewComments.lastitem.comment.article)!='undefined')
			$state.go('/.articles.edit',{id:NewComments.lastitem.comment.article,tabstate:'coment'})
		if(typeof(NewComments.lastitem.comment.project)!='undefined')
			$state.go('/.projects.edit',{id:NewComments.lastitem.comment.project,tabstate:'coment'})

	}else{

		if(typeof(NewComments.lastitem.article)=='object')
			$state.go('/.articles.edit',{id:NewComments.lastitem.article.id,tabstate:'coment'})
		if(typeof(NewComments.lastitem.project)=='object')
			$state.go('/.projects.edit',{id:NewComments.lastitem.project.id,tabstate:'coment'})
	}
	
}

	$scope.changeColors=function (color,serie) {
		
		$scope.myoptions.tooltipTemplate= '<%= value %>';
		if(serie=='Taux rebond' || serie=='% nouvelles sessions')
			$scope.myoptions.tooltipTemplate= '<%= value %> %';
		if(serie=='Durée moyenne d\'une session' )
			$scope.myoptions.tooltipTemplate= '<%= value %> s';
		$scope.colors=[]
		$scope.colors.push(color)
		$scope.series = [];
		$scope.series.push(serie)
	}
	$scope.loadGraph=function () {
		$scope.analytics=true;
		$scope.loadingGraph=true;
		if($scope.previousperiod!=$scope.period)
			$scope.loadingLabels=true;
		$scope.previousperiod=$scope.period
		$scope.data=[];
		$scope.data[0]=[];
		$scope.labels=[];
		dashboardService.Analitycs($scope.period,$scope.metric).then(function (data) {

			for(var key in data.count)
			{
				$scope.count[key.substring(3,key.length)]=data.count[key]
			}
			for(var i in data.graph)
			{
				for(var key in data.graph[i].dimensions[0])
				{
					$scope.labels.push(data.graph[i].dimensions[0][key])
				}
				for(var key in data.graph[i].metrics[0])
				{
					$scope.data[0].push(Math.round(data.graph[i].metrics[0][key]*100)/100)
				}	
			}	
			var tmpdate;
			for(var j in $scope.labels){
				if($scope.period=='year')
				{
					tmpdate = moment($scope.labels[j],"MM")
					$scope.labels[j] = tmpdate.format('MMMM')
				}else{
					tmpdate = moment($scope.labels[j],"YYYYMMDD")
					$scope.labels[j] = tmpdate.format('Do MMM')
				}
			}
			$scope.loadingGraph=false;
			$scope.loadingLabels=false;
		},function (err) {
			$scope.analytics=false;
		})
	}
	$scope.loadGraph();

	// $scope.loadGraph=function (mode) {
	// 	$scope.loadingGraph=true;
	// 	// $scope.labels=[]
	// 	// $scope.data=[]
	// 	$scope.labels = [];
	// 	$scope.datas = [];
	// 	$scope.datas[0] = [];
	// 	dashboardService.Analitycs(mode).then(function (data) {
	// 		console.log(data);
	// 		// for(var key in data.graph)
	// 		// {
				
	// 		// 	console.log(data.graph[key]);
	// 		// 	$scope.labels.push(data.graph[key].dimensions[0]['ga:date'])
	// 		// 	// $scope.graph[key.substring(3,key.length)]=data.graph[key]
	// 		// }
			

	// 		for(var i in data.graph)
	// 		{
	// 			if(i < 3){

	// 			$scope.labels.push(data.graph[i].dimensions[0]['ga:date'])			
	// 			for(var key in data.graph[i].metrics[0])
	// 			{
	// 				console.log(data.graph[i].metrics[0][key]);
	// 				$scope.datas[0].push(data.graph[i].metrics[0][key])
	// 			}	
	// 			}
	// 		}
	// 		console.log($scope.datas);
	// 		console.log($scope.labels);
	// 		$scope.loadingGraph=false;
			
	// 	})
	// }
	// $scope.loadGraph('month');

	
 	$scope.colors = ['#568203'];
  	$scope.series = ['Sessions'];
  	$scope.myoptions = {scaleBeginAtZero : true,responsive:true,maintainAspectRatio: true,scaleShowGridLines : false,tooltipTemplate: '<%= value %>'}
  	// $scope.colors = [{fillColor: "rgba(0,0,0,0.2)",pointColor: "#555",pointHighlightFill: "grey",pointHighlightStroke: "#555",pointStrokeColor: "white",strokeColor: "#555"},{fillColor: "lightgreen",pointColor: "green",pointHighlightFill: "lightgreen",pointHighlightStroke: "darkgreen",pointStrokeColor: "white",strokeColor: "green"}];
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