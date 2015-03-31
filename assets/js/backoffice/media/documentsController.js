app.controller('documentsCtrl', ['$scope', '$upload', '$timeout', 'documentService', 'messageCenterService', function ($scope, $upload,$timeout,documentService,messageCenterService) {
    // $scope.$watch('files', function () {
    //     $scope.upload($scope.files);
    // });
    $scope.index=0;
    $scope.uploads=[];
    $scope.list=[];
    $scope.selectedFile={};
    $scope.selectedFile.description='';
    $scope.test='tttttttt';





    $scope.select=function (argument) {
        console.log(argument);
        $scope.selectedFile=null;
        $scope.selectedFileFinishLoading=false;
        for(var i in $scope.list){
            $scope.list[i].selected=false;

        }
        $scope.list[argument].selected=true;
         $scope.selectedFile=$scope.list[argument];
         // $scope.selectedFile.description = $scope.selectedFile.description || '';
         document.body.scrollTop=0;
    }
   $scope.remove=function () {
       documentService.remove($scope.selectedFile.id).then(function (data) {
            console.log(data);

            $scope.list.splice($scope.list.indexOf($scope.selectedFile),1)
            $scope.select(0)


            messageCenterService.add('success', 'Documment supprimé', { status: messageCenterService.status.unseen ,timeout: 3000});
            document.body.scrollTop=0;
        },function (err) {
            messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
            document.body.scrollTop=0;

        })
   }
   
   $scope.save=function () {
       console.log("saveImage");

        documentService.update($scope.selectedFile).then(function (data) {
            console.log(data);
            $scope.reload();
            messageCenterService.add('success', 'Options enregistrés', { status: messageCenterService.status.unseen ,timeout: 3000});
            document.body.scrollTop=0;
        },function (err) {
            messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
            document.body.scrollTop=0;

        })

   }
   
    $scope.loading=true;
    $scope.filter = documentService.filter;
    $scope.reload= function () {
        $scope.loading=true;
        $scope.users = documentService.fetch().then(function(data) {
            $scope.list = data.data ;
            console.log('$scope.list==>',$scope.list);
            $scope.total = data.total ;
            $scope.loading=false;
            var olderSelection=false;
            if($scope.selectedFile)
            {
                console.log('selectedFile', $scope.selectedFile);
                
                for(var i=0; i< $scope.list.length;i++)
                {
                    if($scope.list[i].id === $scope.selectedFile.id){
                        $scope.selectedFile=$scope.list[i];
                        $scope.list[i].selected=true;
                        olderSelection=true;
                    }

                }
               
            }
            if(!olderSelection)
            {
                $scope.list[0].selected=true;
                $scope.selectedFile = $scope.list[0];
            }

            document.body.scrollTop=0;
        },function(err) {
            console.log(err);
        });
    }
    $scope.reload();
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.filter.page);
        $scope.reload()
    };
    $scope.setOrder = function(val) {
        $scope.filter.order=val;
        $scope.reload()
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
                        url: '/upload/file',
                        file: $scope.uploads[i].file,
                        fileFormDataName: 'files'
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
                                $scope.reload();
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