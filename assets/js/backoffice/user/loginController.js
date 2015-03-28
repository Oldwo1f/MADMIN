app.controller('LoginCtrl', ['$scope', '$auth', function($scope, $auth) {
	console.log('LOGINCOntroller');
    $scope.login = function() {

    	console.log('LOGIN POST');
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          console.log('LOGIN success');
        })
        .catch(function(response) {
          console.log('LOGIN error');
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