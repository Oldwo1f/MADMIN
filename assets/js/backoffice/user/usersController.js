app.controller('usersCtrl',['$scope', 'filterFilter', '$filter', '$state', '$stateParams', 'userService', function usersCtrl($scope,filterFilter,$filter,$state,$stateParams,userService) {



	$scope.htmlTooltip='<label>Supprimer définitivement?</label><span class="btn btn-xs btn-success">Oui</span> <span class="btn btn-xs btn-danger" ng-click="closeToolTip()" >Non</span>'

	$scope.closeToolTip=function (elem) {
		console.log('CLOSE TOOLTIP');
// angular.element('.tooltipitem').trigger('click');
		console.log(elem);
	}

	$scope.loadingUsers=true;
console.log('userController');
	document.body.scrollTop=0;
	$scope.users=userService.users;
	$scope.loadingUsers=false;
	$scope.loadingGraph=true;
	$scope.loadingGraph2=true;
	$scope.filter = userService.filter;

	$scope.reloadUsers= function () {
		$scope.loadingUsers=true;
		$scope.users = userService.fetchUsers().then(function(data) {
			$scope.users = data.users ;
			$scope.total = data.total ;
			console.log($scope.total);
			$scope.nbpage = Math.ceil(data.total/3);
			console.log($scope.nbpage);
			console.log($scope.users);
			$scope.loadingUsers=false;
			document.body.scrollTop=0;
		},function(err) {
			console.log(err);
		});

		
		

	}
	$scope.reloadUsers();
	$scope.pageChanged = function() {
    	console.log('Page changed to: ' + $scope.filter.page);
    	$scope.reloadUsers()
  	};
	$scope.setOrder = function(val) {
    	$scope.filter.order=val;
    	$scope.reloadUsers()
  	};
	$scope.editUser = function(id) {
    	$state.go("/.users.edit",{ id: id})
    	clearSelection()
  	};
	$scope.remove = function(id) {
    	userService.remove(id).then(function(data) {
			$scope.reloadUsers()
		},function(err) {
			console.log(err);
		});
  	};
	

	$scope.loadGraph=function (mode) {
		$scope.loadingGraph=true;
		// $scope.labels=[]
		// $scope.data=[]
		var labels = [];
		var datas = [];
		datas[0]=[];
		datas[1]=[];
		userService.loadGraph(mode).then(function (data) {
			console.log(data);

			for(var i in data){
				labels.push(data[i].label);
				datas[0].push(data[i].userData +data[i].memberData)
				datas[1].push(data[i].memberData)
			}
			console.log(labels);
			console.log(datas);
			$scope.labels = labels.reverse();
			datas[0] = datas[0].reverse()
			datas[1] = datas[1].reverse()
			$scope.loadingGraph=false;
			$scope.data=datas
			
			console.log('tttttttttttttttttttttttttttttttttttt',$scope.data);
		})
	}
	$scope.loadGraph('full');
	$scope.loadGraph2=function (mode) {
		$scope.loadingGraph2=true;
		// $scope.labels=[]
		// $scope.data=[]
		var datas = [];
		
		userService.loadGraph2(mode).then(function (data) {
			
			$scope.loadingGraph2=false;
			$scope.data2=data
			
			
		})
	}
	$scope.loadGraph2('all');

 	$scope.labels = [];
  	$scope.series = ['Utilisateur', 'Membre'];
  	$scope.myoptions = {scaleBeginAtZero : true,responsive:true,maintainAspectRatio: true,scaleShowGridLines : false,}
  	$scope.colors = [{fillColor: "rgba(0,0,0,0.2)",pointColor: "#555",pointHighlightFill: "grey",pointHighlightStroke: "#555",pointStrokeColor: "white",strokeColor: "#555"},{fillColor: "lightgreen",pointColor: "green",pointHighlightFill: "lightgreen",pointHighlightStroke: "darkgreen",pointStrokeColor: "white",strokeColor: "green"}];
  	$scope.data = [];
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };

 	// $scope.labels2 = [];
  	$scope.labels2 = ['Aujourd\'hui','Il y à moins d\'une semaine', 'Il y à moins d\'un mois','Il y à moins de 6 mois','Il y à plus de 6 mois'];
  	$scope.myoptions2 = {responsive:true,maintainAspectRatio: false,scaleShowGridLines : false,height:300}
  	$scope.colors2 = ['#006600','#00AA00','#5cb85c','#FF7E00','#AF002A'];
  	$scope.data2 = [56,89,15,75,23];
	  $scope.onClick2 = function (points, evt) {
	    console.log(points, evt);
	  };

	
	

}]);
angular.module('ngFabForm')
    .directive('uniqueemail',  ['$http', '$q', function uniqueemail($http,$q)
    {
        'use strict';

        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                uniqueemail: '='
            },
            link: function (scope, el, attrs, ngModel)
            {

            	console.log('LINK UniqueEmail directive');

                ngModel.$asyncValidators.uniqueemail = function(modelValue, viewValue) {
				  	var value = modelValue || viewValue;
				  	console.log('validating...');
					// var deferred = $q.defer();
					return $http.get('/user/verifyUniqueEmail/' + value).
					then(function resolved() {
						console.log('exist');
					//username exists, this means validation fails
						return $q.reject('exists');
					}, function rejected() {
						console.log('Ok to go');
						//username does not exist, therefore this validation passes
						return true;
					});

				    

				};
			
            }
        };
    }]);
angular.module('ngFabForm')
    .directive('uniquepseudo',  ['$http', '$q', '$timeout', function uniquepseudo($http,$q,$timeout)
    {
        'use strict';

        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                uniquepseudo: '='
            },
            link: function (scope, el, attrs, ngModel)
            {

            	console.log('LINK UniquePseudo directive');

                ngModel.$asyncValidators.uniquepseudo = function(modelValue, viewValue) {
				  	var value = modelValue || viewValue;
				  	console.log('validating...');
				  	// console.log(value.$pending)
				  	// modelValue.$pending=true;
					// var deferred = $q.defer();
				   	return $http.get('/user/verifyUniquePseudo/' + value).
					then(function resolved() {
						console.log('exist');
						// value.$pending=false;
					//username exists, this means validation fails
					return $q.reject('exists');
					}, function rejected() {
						console.log('Ok to go11');
						// value.$pending=false;
						//username does not exist, therefore this validation passes
						return true;
					});

				    

				};
			
            }
        };
    }]);

app.controller('addUserCtrl',['$scope', 'filterFilter', '$filter', '$state', 'userService', '$rootScope', 'messageCenterService', function addUserCtrl($scope,filterFilter,$filter,$state,userService,$rootScope,messageCenterService) {
	document.body.scrollTop=0;
	$scope.isCollapsed=true;

	$scope.formData={};
	$scope.formData.role = "user";
	$scope.formData.civ = "M.";
	$scope.formData.name = "";
	$scope.formData.pseudo = "";
	$scope.formData.email = "";
	$scope.formData.phone = "";
	$scope.formData.company = "";
	$scope.formData.fonction = "";
	$scope.formData.usename = false;
	$scope.formData.publishEmail = false;
	$scope.formData.publishPhone = false;
	


	$scope.setFormScope= function(scope){
       $scope.formScope = scope;
    }
	// $scope.$watch('formData.pseudo',function(newValue, oldValue) {
	// 	console.log('pending='+$scope.formData.pseudo.$pending);
	// })
	
	// $scope.$watch($scope.formData.pseudo.$pending)
	// ngModel.$asyncValidators.uniqueEmail = function(modelValue, viewValue) {
	// 	var value = modelValue || viewValue;

	// 	// Lookup user by username
	// 	return $http.get({url:'/api/users/' + value}).
	// 	   	then(function resolved() {
	// 	     //username exists, this means validation fails
	// 	     return $q.reject('exists');
	// 	   	}, function rejected() {
	// 	     //username does not exist, therefore this validation passes
	// 	     return true;
	//    		});
	// };

	$scope.addNewUser=function() {
		console.log('ADDNEW Ctrl');
		var rep = userService.addNew($scope.formData).then(function(data) { 
				$state.go('/.users');
				$scope.reloadUsers();
				messageCenterService.add('success', 'Utilisateur ajouté', { status: messageCenterService.status.next ,timeout: 3000});
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				if(data==="pseudoError" || data==="emailError"){
					if(data==="pseudoError"){
							console.log($scope.formScope);
						 $scope.formScope.FORMaddNewUser.pseudo.$setValidity('uniquepseudo', false);
					}
					if(data==="emailError"){
						 $scope.formScope.FORMaddNewUser.email.$setValidity('uniqueemail', false);
					}
				}
				else
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMaddNewUser[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};
	



}]);

app.controller('editUserCtrl',['$scope', 'filterFilter', '$filter', '$state', 'userService', '$rootScope', 'user', 'messageCenterService', function editUserCtrl($scope,filterFilter,$filter,$state,userService,$rootScope,user,messageCenterService) {

	// $scope.isCollapsed=true;
	document.body.scrollTop=0;
	$scope.formData=user;
	console.log($scope.formData);
	// $scope.formData.role = "user";
	// $scope.formData.civ = "M.";
	// $scope.formData.name = "";
	// $scope.formData.pseudo = "";
	// $scope.formData.email = "";
	// $scope.formData.phone = "";
	// $scope.formData.company = "";
	// $scope.formData.fonction = "";
	// $scope.formData.usename = false;
	// $scope.formData.publishEmail = false;
	// $scope.formData.publishPhone = false;
	


	$scope.setFormScope= function(scope){
       $scope.formScope = scope;
    }
	

	$scope.editUser=function() {
		console.log('EDIT Ctrl');
		$scope.formData.image= null;
		var rep = userService.editUser($scope.formData).then(function(data) { 
			console.log('success');
			console.log(data);
				$state.go('/.users');
				$scope.reloadUsers();
				messageCenterService.add('success', 'Utilisateur enregistré', { status: messageCenterService.status.next ,timeout: 3000});
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				if(data==="pseudoError" || data==="emailError"){
					if(data==="pseudoError"){
							console.log($scope.formScope);
						 $scope.formScope.FORMeditUser.pseudo.$setValidity('uniquepseudo', false);
					}
					if(data==="emailError"){
						 $scope.formScope.FORMeditUser.email.$setValidity('uniqueemail', false);
					}
				}
				else
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMeditUser[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};




}]);
