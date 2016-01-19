app.controller('htmlCtrl',['messageCenterService', '$scope', 'filterFilter', '$filter', '$state', '$stateParams', 'htmlService', function projectsCtrl(messageCenterService,$scope,filterFilter,$filter,$state,$stateParams,projectService) {

	$scope.loading=true;
	$scope.newItemFlag=false;
	$scope.newItem={};
	console.log('htmlCtrlController');
	document.body.scrollTop=0;
  $scope.selectedpage="";
	$scope.currentPage="";

  $scope.list =[]
  // $scope.htmlVariable ="<div class=\"haut rose\">\n\t<img src=\"images/recrut.png\" alt=\"\">\n\t<h2 class=\"fleche\">Appui au recrutement</h2>\n\t<p>Le recrutement d’un nouveau collaborateur constitue une phase déterminante pour une entreprise et représente un investissement en temps, non négligeable.</p>\n\t<p>\n\tLa Maison de l’Emploi, en étroite collaboration avec le  Pôle Emploi, met en place un process permettant aux entreprises de bénéficier d’une offre de services adaptée à vos besoins.\n\t</p>\n</div>\n<div class=\"contenu\">\n\t\n\t<ul>\n\t\t<li><p>Cette ingénierie favorise l’emploi local. <br>\n\tElle élabore, structure et suit l’ensemble du processus de recrutement et coordonne tous les acteurs de l’emploi. Il s’agit de :</p></li>\n\t\t<li>\n\t\t\t<ul>\n\t\t\t\t<li>Rencontrer l’entreprise pour l’identification des besoins,</li>\n\t\t\t\t<li>Identifier le process Ressources Humaines,</li>\n\t\t\t\t<li>Identifier un interlocuteur privilégié,</li>\n\t\t\t\t<li>Conseiller sur l’élaboration du profil de poste (soutien aux TPE),</li>\n\t\t\t\t<li>Aider à la rédaction des annonces (soutien aux TPE),</li>\n\t\t\t\t<li>Diffuser les offres via le Pôle Emploi et le site internet de la Maison de l’Emploi,</li>\n\t\t\t\t<li>Organiser des évènements sur l’ensemble du territoire (job dating, forum, information collective...)</li>\n\t\t\t\t<li>Elaborer un kit de communication : affiches, flyers, relation presse locale,</li>\n\t\t\t\t<li>Organiser des ateliers de préparation des publics,</li>\n\t\t\t\t<li>Adapter et mobiliser si nécessaire les outils et dispositifs d’aide à l’embauche en fonction des besoins identifiés,</li>\n\t\t\t\t<li>Préselectionner et positionner les candidats,</li>\n\t\t\t\t<li>Evaluer.</li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li>\n\t\t\t<p>L’ensemble des partenaires/prescripteurs est associé à la démarche pour la mobilisation du public. L’objectif est de privilégier les chercheurs d’emploi du territoire.</p>\n\t\t\t<p><strong>Si vous souhaitez participer à l'un ou plusieurs de ces modules, contactez <span class=\"green\">Mylène LEFEVRE</span> au 01 60 09 84 83 ou par mail : <a href=\"mailto:m.lefevre@mdene77-mlidf.org\">m.lefevre@mdene77-mlidf.org</a></strong></p>\n\t\t</li>\n\t</ul>\n</div>\n"


    $scope.select=function (argument) {
        console.log(argument);
        $scope.selected=null;
        $scope.selectedFinishLoading=false;
        for(var i in $scope.list){
            $scope.list[i].selected=false;

        }
        $scope.list[argument].selected=true;
         $scope.selected=$scope.list[argument];
         // $scope.selected.description = $scope.selected.description || '';
         document.body.scrollTop=0;
    }
	$scope.reload= function () {
		$scope.loading=true;
		// $scope.loadingGraph2=true;
		projectService.fetchAll().then(function(data) {
			$scope.list = data.data ;

      console.log($scope.list);
			
			document.body.scrollTop=0;
      $scope.loading=false;
		},function(err) {
			console.log(err);
			$scope.loading=false;
		});

		
		

	}
	$scope.reload();



  $scope.changepage = function (argument) {

    console.log('change page ==>');
    console.log($scope.selectedpage);
    
    projectService.fetch($scope.selectedpage.name).then(function(data) {
      $scope.currentPage = data.data ;

      
      document.body.scrollTop=0;

    },function(err) {
      console.log(err);
      $scope.loading=false;
    });
  }

  $scope.save = function (argument) {

    projectService.save($scope.selectedpage.name,$scope.currentPage).then(function(data) {
      // $scope.currentPage = data.data ;

      messageCenterService.add('success', 'Page Html enregistrée', { status: messageCenterService.status.unseen ,timeout: 3000});
      document.body.scrollTop=0;
 
    },function(err) {
      console.log(err);
      $scope.loading=false;
    });
  }



	$scope.edit = function(id) {
    	$state.go("/.projects.edit",{ id: id , tabstate:'info' })
    	clearSelection()
  	};
	$scope.pageChanged = function() {
    	$scope.reload()
  	};
	$scope.setOrder = function(val) {
    	$scope.filter.order=val;
    	$scope.reload()
  	};
	$scope.remove = function(id) {
    	projectService.remove(id).then(function(data) {
    		messageCenterService.add('success', 'Tag supprimé', { status: messageCenterService.status.unseen ,timeout: 3000});
			$scope.reload()
		},function(err) {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
			console.log(err);
		});
  	};
	$scope.cancelNew = function(id) {
    	$scope.newItemFlag=false;
    	$scope.newItem={};
  	};
	$scope.addNew = function(id) {
		projectService.add($scope.newItem).then(function(data) {
			messageCenterService.add('success', 'Nouveau projet ajouté', { status: messageCenterService.status.unseen ,timeout: 3000});
			$scope.reload()
		},function(err) {
			messageCenterService.add('danger', 'Une erreur s\'est produite', { status: messageCenterService.status.unseen ,timeout: 3000});
			console.log(err);
		});
    	$scope.newItemFlag=false;
  	};
	


  	$scope.myoptions2 = {responsive:true,maintainAspectRatio: false,scaleShowGridLines : false,height:300}
  	

	
	

}]);
