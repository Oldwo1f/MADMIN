app.controller('appCtrl',['$auth', '$location', '$scope', '$rootScope', 'configService', 'filterFilter', '$filter', '$state', 'accountService', function appCtrl($auth,$location,$scope,$rootScope,configService,filterFilter,$filter,$state,accountService) {
	
  $scope.h1 = configService.h1;
  $scope.url = configService.url;
  $scope.languages = _.clone(configService.languages);
  $scope.defaultLanguage = configService.defaultLanguage;
  // console.log($scope.languages);
  

  // console.log('$scope.languagesToTranslate',$scope.languagesToTranslate);



  $scope.$on("$stateChangeStart", function (event, toState, toParams,fromState, fromParams) {
    console.log('stateChangeStart');
    console.log($auth.isAuthenticated());
    console.log('-------------------------');
    console.log(toState.name);
    console.log('-------------------------');
    if(toState.name === "login"){
        console.log('here login');
      return true;
    }else{
        console.log('else');
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
    console.log('STATECHANGE SUCCESS');
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
    $(window).resize();
    
  });



}]);
$(window).resize(function() {
  console.log('resize');
  height = $(window).height()-67
  $('#page-wrapper').css({'min-height':$(window).height()+'px'})
}).resize()