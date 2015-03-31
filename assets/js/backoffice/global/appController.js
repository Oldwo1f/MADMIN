app.controller('appCtrl',['$auth', '$location', '$scope', 'configService', 'filterFilter', '$filter', '$state', 'accountService', function appCtrl($auth,$location,$scope,configService,filterFilter,$filter,$state,accountService) {
	
  $scope.h1 = configService.h1;
  $scope.url = configService.url;
  accountService.getProfile().then(function (data) {
    $scope.me = data;
  })


  $scope.$on("$stateChangeStart", function (event, toState, toParams,fromState, fromParams) {

      $scope.navbarOff=false;
    if(toState.name === "/login"){
      $scope.navbarOff=true;
    }
    if($auth.isAuthenticated())
    {
      if(toState.name === "/")
          $location.path('/dashboard')
      return true;
    }else
    {
      $scope.navbarOff=true;
      // $state.go('/login');
      $location.path('/login')
      return false
    }
    
  });



}]);