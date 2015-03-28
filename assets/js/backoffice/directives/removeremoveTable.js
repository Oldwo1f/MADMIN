app.directive('removeremovetable', function(){
    return {
        restrict: 'E',
        // transclude: true,
        scope: { action:'=action',image:'=image',itemid:'=itemid'},
        template: '<button type="button"  tooltip="Supprimer" tooltip-trigger="mouseenter" tooltip-placement="top" class="btn btn-danger tablebtn btn-xs pull-right">' +
                    '<span class="glyphicon glyphicon-trash"></span>' +
                  '</button>'
        ,
        link:function(scope, element, attrs) {


	        	scope.clickedOnce = false;
	        	$(element).find('button').click(function() {
	        		var t = $(this);
	        		if(!scope.clickedOnce)
	        		{
	        			t.css({position:'absolute', right:'23px','z-index':"100"});
	        			t.addClass('expand')
	        			scope.clickedOnce = true;
	        			t.html('<span class="glyphicon glyphicon-trash"></span> définitivement?')
	        			var timeout = setTimeout(function() {
	        				t.removeClass('expand')
	        				scope.clickedOnce = false;
	        				t.html('<span class="glyphicon glyphicon-trash"></span>')
	        				t.css({position:'relative', right:'0px','z-index':"100"});
	        			},5000)
	        		}else
	        		{
	        			// scope.click(); 
	        			t.removeClass('expand')
	        			scope.clickedOnce = false;
	        			t.html('<span class="glyphicon glyphicon-trash"></span>')
	        			t.css({position:'relative', right:'0px','z-index':"100"});
	        				// if(scope.image)
					        // {
					        		scope.action(scope.itemid);
					        // }else{
					        // 	if(scope.itemid)
					        // 		scope.action(scope.itemid);
					        // 	else
					        // 		scope.action();
					        	
					        // }
	        		}
	        	})

      	}
     }
  })