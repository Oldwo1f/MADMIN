app.controller('appCtrl',['$auth', '$location', '$scope', '$rootScope', 'configService', 'filterFilter', '$filter', '$state', 'accountService', function appCtrl($auth,$location,$scope,$rootScope,configService,filterFilter,$filter,$state,accountService) {
	
  $scope.h1 = configService.h1;
  $scope.url = configService.url;
  $scope.languages = _.clone(configService.languages);
  $scope.defaultLanguage = configService.defaultLanguage;
  // console.log($scope.languages);
  

  // console.log('$scope.languagesToTranslate',$scope.languagesToTranslate);
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
  $scope.$on('$stateChangeSuccess',function (event, toState, toParams, fromState, fromParams){
    $scope.$previousState = fromState;
    console.log('STATECHANGE SUCCESS');
    // $scope.navbarOff=false;
    console.log(toState);
    if(toState.name === "/.articles.edit"){
      console.log("changeState goodname");
      console.log(toParams.tabstate);
      $rootScope.currenttabs=toParams.tabstate
      return true;
    }
    $(window).resize();
    // console.log($(window).height());
    
  });



}]);
$(window).resize(function() {
  console.log('resize');
  // $('#wrapper').css({'min-height':$(window).height()+'px'})
  height = $(window).height()-67
  $('#page-wrapper').css({'min-height':height+'px'})
}).resize()