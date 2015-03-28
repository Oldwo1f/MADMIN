(function() {
  'use strict';

  angular.module('markdownpreview', [])

  .controller('Ctrl', ['$scope', '$window', '$http', '$sce', function($scope, $window, $http, $sce) {

      $scope.addlinkoff = true;
      $scope.addimgoff = true;
      $scope.md2Html = function() {
        $scope.html = $window.marked($scope.model);
        $scope.htmlSafe = $sce.trustAsHtml($scope.html);
      };

      $scope.initFromUrl = function(url) {
        $http.get(url).success(function(data) {
          $scope.model = data;
          return $scope.md2Html();
        });
      };

      $scope.initFromText = function(text) {
        $scope.model = text;
        $scope.md2Html();
      };
      $scope.enterPreview = function() {
        
        $scope.md2Html();
      };
      $scope.toogleCheat = function() {
          $scope.cheatVisible = !$scope.cheatVisible;
      };
      $scope.addLink = function(t) {
  
        if($scope.Linklink && $scope.Linktext && $scope.Linklink.substring(0,4) =="http")
        {
          var toAdd = ' ['+$scope.Linktext+']('+$scope.Linklink+') '
          $scope.model += toAdd;
          console.log(toAdd);
            $scope.Linktext='';
            $scope.Linklink='';
            $scope.addlinkoff = true;
        }else{

          return false;
        }

      };
      $scope.addImg = function(t) {

        if($scope.IMGlink  && $scope.IMGlink.substring(0,4) =="http")
        {
          if($scope.IMGtext)
            var toAdd = ' !['+$scope.IMGtext+']('+$scope.IMGlink+') '
          else
            var toAdd = ' ![]('+$scope.IMGlink+') '
          $scope.model += toAdd;
            $scope.IMGtext='';
            $scope.IMGlink='';
            $scope.addimgoff = true;
        }else{

          return false;
        }
      };

    }
  ])

  .directive('markdownpreview', function() {
    return {
      template:'<div class="form-group col-xs-12" >'+
      '<div class="markdaownheader">'+
      '<li ng-click="addimgoff = true; addlinkoff=!addlinkoff" ng-hide="previewmode" title="Ajouter un lien" class="glyphicon glyphicon-link"></li>'+
      '<li ng-click="addlinkoff= true; addimgoff=!addimgoff" ng-hide="previewmode" title="Ajouter une image" class="glyphicon glyphicon-picture"></li>'+
      '<li ng-click="previewmode = true" ng-hide="previewmode" title="Preview" class="glyphicon glyphicon-eye-open"></li>'+
      '<li ng-click="previewmode = false" ng-show="previewmode" title="Preview" class="glyphicon glyphicon-eye-close"></li>'+
      '<li title="CheatSheets" ng-click="toogleCheat()" class="glyphicon glyphicon-pushpin"></li>'+
      '<li title="Le markdown pourquoi et comment" class="glyphicon glyphicon-question-sign"></li>'+
      '</ul>'+
      '<div class="ajoutdelien pull-left" ng-hide="addlinkoff"><form ng-submit="addLink()"><input type="text" ng-model ="Linktext" class="form-control input-sm" placeholder="texte cliquable"/><input ng-model ="Linklink" type="text" class="form-control input-sm" placeholder="Url du lien"/><input ng-hide="true" class="form-control btn btn-default input-sm" type="submit" value="ok" /> </form> </div>'+
      '<div class="ajoutdelien pull-left" ng-hide="addimgoff"><form ng-submit="addImg()"><input type="text" ng-model ="IMGtext" class="form-control input-sm" placeholder="texte alternatif"/><input ng-model ="IMGlink" type="text" class="form-control input-sm" placeholder="Url de l\'image"/><input ng-hide="true" class="form-control btn btn-default input-sm" type="submit" value="ok" /> </form> </div>'+
      '</div>'+
      '<div class="cheatsheets" name="{{handleerror}}" ng-class="{\'visible\' :cheatVisible}" ng-include="\'/templates/backoffice/global/mdcheatsheets.html\'" ></div>'+
      '<span class="placeholderabsolute" ng-hide="model" >{{placehold}}</span> <textarea  ng-hide="previewmode" class="form-control input-lg" style="min-height:{{height}}px" ng-change="md2Html()" ng-model="model" ></textarea>'+
      ' <div class="MdPreview-html form-control input-lg" ng-show="previewmode" style="min-height:{{height}}px" ng-bind-html="htmlSafe" /></div>',
      restrict: 'E',
      replace: true,
      controller: 'Ctrl',
      scope: {placehold:'=placehold',handleerror :'=handleerror',height:'=minheight',model:'=ngModel'},
      link: function(scope, element, attrs) {
        scope.md2Html();
        scope.previewmode = false; 
        scope.cheatVisible = false
        if (attrs.url) {
          scope.initFromUrl(attrs.url);
        }
        if (attrs.text) {
          scope.initFromText(attrs.text);
        }
        // scope.model = attrs.model;
      }
    };
  });

}).call(this);
