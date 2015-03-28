app.controller('imageCtrl', ['$scope', '$upload', '$timeout', 'imageService', 'messageCenterService', function ($scope, $upload,$timeout,imageService,messageCenterService) {
    // $scope.$watch('files', function () {
    //     $scope.upload($scope.files);
    // });
    $scope.index=0;
    $scope.uploads=[];
    $scope.selectedImage='';
    $scope.selectedImageFinishLoading=false;




    $scope.htmlTooltip='<label>Supprimer définitivement?</label><span class="btn btn-xs btn-success">Oui</span> <span class="btn btn-xs btn-danger" ng-click="closeToolTip()" >Non</span>'

    $scope.selectImg=function (argument) {
        console.log(argument);
        $scope.selectedImage=null;
        $scope.selectedImageFinishLoading=false;
        for(var i in $scope.images){
            $scope.images[i].selected=false;

        }
        $scope.images[argument].selected=true;
         $scope.selectedImage=$scope.images[argument];
         document.body.scrollTop=0;
    }
   $scope.remove=function () {
       imageService.remove($scope.selectedImage.id).then(function (data) {
            console.log(data);

            $scope.images.splice($scope.images.indexOf($scope.selectedImage),1)
            $scope.selectImg(0)


            messageCenterService.add('success', 'Image supprimée', { status: messageCenterService.status.unseen ,timeout: 3000});
            document.body.scrollTop=0;
        },function (err) {
            messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
            document.body.scrollTop=0;

        })
   }
   $scope.loadImage=function (index) {
       console.log("loadImage",index);

       $scope.$apply(function () {
           $scope.images[index].finishloading=true;
       })

   }
   $scope.saveImage=function () {
       console.log("saveImage");

        imageService.update($scope.selectedImage).then(function (data) {
            console.log(data);
            messageCenterService.add('success', 'Options enregistrés', { status: messageCenterService.status.unseen ,timeout: 3000});
            document.body.scrollTop=0;
        },function (err) {
            messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
            document.body.scrollTop=0;

        })

   }
   $scope.loadBigImage=function (index) {

       $scope.$apply(function () {
           $scope.selectedImageFinishLoading=true;
       })

   }
    $scope.loadingImages=true;
    $scope.images=imageService.images;
    $scope.filter = imageService.filter;
    $scope.reloadImages= function () {
        $scope.loadingImages=true;
        $scope.users = imageService.fetch().then(function(data) {
            $scope.images = data.images ;
            console.log('scopeimage==>',$scope.images);
            $scope.total = data.total ;
            $scope.loadingImages=false;
            var olderSelection=false;
            if($scope.selectedImage)
            {
                console.log('selectedImage', $scope.selectedImage);
                
                for(var i=0; i< $scope.images.length;i++)
                {
                    if($scope.images[i].id === $scope.selectedImage.id){
                        $scope.images[i].selected=true;
                        olderSelection=true;
                    }

                }
               
            }
            console.log(olderSelection);
            if(!olderSelection)
            {
                console.log($scope.images);
                $scope.images[0].selected=true;
                $scope.selectedImage = $scope.images[0];
            }

            document.body.scrollTop=0;
        },function(err) {
            console.log(err);
        });
    }
    $scope.reloadImages();
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.filter.page);
        $scope.reloadImages()
    };
    
   
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $scope.uploads[$scope.index]={};
                $scope.uploads[$scope.index].file=file;
                $scope.uploads[$scope.index].status='start';
                $scope.uploads[$scope.index].text='0%';
                $scope.index++;
                
            }
            console.log($scope.uploads);
            for (var i = 0; i < $scope.uploads.length; i++) {

                console.log('loop');
                if( $scope.uploads[i].status=='start'){

                    console.log('START');
                    $scope.uploads[i].status='progress'
                    $upload.upload({
                        url: '/upload/images',
                        file: $scope.uploads[i].file,
                        fileFormDataName: 'imgs'
                    }).progress(function (evt) {
                        console.log($scope.uploads);
                        for(var j=0; j< $scope.uploads.length;j++)
                        {
                            if($scope.uploads[j].file.name == evt.config.file.name)
                            {
                                $scope.uploads[j].progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                $scope.uploads[j].text = $scope.uploads[j].progressPercentage+'%'
                            }
                        }
                        // console.log(evt);
                        // console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log(data);
                        for(var j=0; j< $scope.uploads.length;j++)
                        {
                            if($scope.uploads[j].file.name == config.file.name)
                            {
                                $scope.uploads[j].text = 'Envoi terminé';
                                $scope.reloadImages();
                                (function(j){

                                    $timeout(function (argument) {
                                        $scope.uploads[j].status = 'success';
                                    },3000)
                                })(j)
                                
                                // window.setTimeout(function (argument) {
                                //      $scope.uploads[j].status = 'success';
                                // },2000)
                            }
                        }
                    });
                }
            };
        }
    };
}]);