app.controller('appCtrl',['$auth', '$location', '$scope', '$rootScope', 'configService', 'filterFilter', '$filter', '$state', 'accountService', function appCtrl($auth,$location,$scope,$rootScope,configService,filterFilter,$filter,$state,accountService) {
	
  $scope.h1 = configService.h1;
  $scope.url = configService.url;
  $scope.languages = _.clone(configService.languages);
  $scope.defaultLanguage = configService.defaultLanguage;
  

  $scope.$on("$stateChangeStart", function (event, toState, toParams,fromState, fromParams) {
    if(toState.name === "login"){
      return true;
    }else{
      if($auth.isAuthenticated())
      {
        if(toState.name === "/")
            $state.go('/.dashboard')
        return true;
      }else
      {
        $state.go('login')
        return true
      }
    }
    
  });
  $scope.$on('$stateChangeSuccess',function (event, toState, toParams, fromState, fromParams){
    $scope.$previousState = fromState;
    if($auth.isAuthenticated())
    {
        if(toState.name === "/")
            $state.go('/.dashboard')
        return true;
    }else
    {
        $state.go('login')
        return true
    }
    if(toState.name === "/.articles.edit"){
      $rootScope.currenttabs=toParams.tabstate
      return true;
    }
    
    
  });
  $scope.$on('$viewContentLoaded',function (event, toState, toParams, fromState, fromParams){
    
    $(window).resize();
    
  });



}]);
$(window).resize(function() {
  height = $(window).height()-67
  document.getElementById('page-wrapper').style.minHeight = height+'px';
}).resize()