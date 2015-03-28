app.controller('profileCtrl',
['$scope', 'filterFilter', '$filter', '$state', 'userService', '$rootScope', '$upload', 'user', 'messageCenterService', function editUserCtrl($scope,filterFilter,$filter,$state,userService,$rootScope,$upload,user,messageCenterService) {
	$scope.changingimage = 0;
	$scope.myImage='';
	$scope.croppedImage='';

	$scope.close=function () {
		$rootScope.back();
	}
	document.body.scrollTop=0;
	$scope.formData=user;
	console.log($scope.formData);
	$scope.clickonimgbtn=function($event) {
    	setTimeout(function() {
    		$($event.target).find('input').click();
    	},0);
    }   
    $scope.cancelImage=function() {
    	$scope.myImage=null;
    	$scope.croppedImage=null;
    	console.log($scope.formData.image);
    	$scope.changingimage = 0;
    }   
	$scope.onFileSelect = function($files) {
    	$scope.countImg= $files.length;
    	// $scope.currentstep=0;
    	console.log($files[0]);
    	// $scope.myImage=$files[0];
    	if($files[0]){
    	$scope.changingimage = 1;

    	var reader = new FileReader();
          reader.onload = function (evt) {
            $scope.$apply(function($scope){
              $scope.myImage=evt.target.result;

              console.log($scope.myImage);
            });
          };
          reader.readAsDataURL($files[0]);
    	}
    
    }

	$scope.changing= function($dataURI){
      console.log('CHANGING',$dataURI);
      $scope.croppedImage=$dataURI;
    }
	$scope.setFormScope= function(scope){
       $scope.formScope = scope;
    }

	$scope.editProfile=function() {
		
		$scope.formData.image=$scope.croppedImage;
		console.log($scope.formData);
		console.log('EDIT Ctrl');
		var rep = userService.editProfile($scope.formData).then(function(data) { 
			console.log('success');
			console.log(data);
			messageCenterService.add('success', 'Profile enregistré', { status: messageCenterService.status.next ,timeout: 3000});
				 $rootScope.back();
				// $scope.reloadUsers();
				document.body.scrollTop=0;
		},function(data) {
				console.log('Error');
				console.log(data);
				if(data==="pseudoError" || data==="emailError"){
					if(data==="pseudoError"){
							console.log($scope.formScope);
						 $scope.formScope.FORMProfile.pseudo.$setValidity('uniquepseudo', false);
					}
					if(data==="emailError"){
						 $scope.formScope.FORMProfile.email.$setValidity('uniqueemail', false);
					}
				}
				else
				if(data.error.error==="E_VALIDATION"){


					for(attr in data.error.invalidAttributes){
						
						for(var i in data.error.invalidAttributes[attr]){
							$scope.formScope.FORMProfile[attr].$setValidity(data.error.invalidAttributes[attr][i].rule, false);
						}
					}   
				}
		});

		
	};




}]);
