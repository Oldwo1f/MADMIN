app.controller('appCtrl',['$auth', '$location', '$scope', '$rootScope', 'configService', 'filterFilter', '$filter', '$state', 'accountService', function appCtrl($auth,$location,$scope,$rootScope,configService,filterFilter,$filter,$state,accountService) {
	
  $scope.h1 = configService.h1;
  $scope.url = configService.url;
  
   configService.getLangs().then(function(data) {
    $scope.defaultLanguage=[]
    $scope.languages = data.locales;
    $scope.defaultLanguage.push(data.defaults)
  })
  configService.getConfig().then(function(data) {
      console.log('configService.h1',configService.h1);
      $scope.h1 = configService.h1;
      $scope.url = configService.url;
  })
  

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
  $('#page-wrapper').css({'min-height':height+'px'});
}).resize()