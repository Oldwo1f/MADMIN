app.controller('LoginCtrl', ['$scope', '$auth','$state','messageCenterService','$http', function($scope, $auth,$state,messageCenterService,$http) {
	console.log('LOGINCOntroller');
    $scope.login = function() {

    	console.log('LOGIN POST');
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          console.log('LOGIN success');
          $state.go('/.dashboard');
        })
        .catch(function(response) {
          console.log('LOGIN error');
          console.log(response);
          messageCenterService.add('danger', 'Veuillez vérifier votre saisie', { status: messageCenterService.status.unseen, timeout: 4000 });
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          console.log('authenticate success');
         
          module.run(['$sailsSocket', function($sailsSocket) {
            // $sailsSocket.defaults.headers.common.Authorization = $auth.getToken();
          }]);
        })
        .catch(function(response) {
          console.log('authenticate error');
        });
    };
    $scope.recup = function() {
      console.log('recupPassword');
      console.log($scope.recupmail);
        // var deferred = $q.defer();
        $http.get('/recupPassword/'+$scope.recupmail).success(function (data,status) {
            // service.box =data;
            messageCenterService.add('success', 'Veuillez vérifier vos email', { status: messageCenterService.status.unseen, timeout: 4000 });

            console.log(data);
            // deferred.resolve(data);
        }).error(function (data,status) {
          console.log('err data');
          console.log(data);
            messageCenterService.add('danger', 'Erreur : Email invalide', { status: messageCenterService.status.unseen, timeout: 4000 });

            // deferred.reject('error perso');
        })
        // return deferred.promise;

    };

  }]);



app.controller('LogoutCtrl', ['$auth', function($auth) {
    if (!$auth.isAuthenticated()) {
        return;
    }
    $auth.logout()
      .then(function() {
        console.log('LOGOUT success');
      });
  }]);


app.controller('SignupCtrl', ['$scope', '$auth', function($scope, $auth) {
    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password
      }).catch(function(response) {
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            
          });
        } else {
          
        }
      });
    };
  }]);