app.directive('removeremovetable', function(){
    return {
        restrict: 'E',
        // transclude: true,
        scope: { action:'=action',image:'=image',itemid:'=itemid'},
        template: '<button type="button"  class="btn btn-danger btn-xs tablebtn pull-right">' +
                    '<i class="glyphicon glyphicon-trash"></i>' +
                  '</button>'
        ,
        link:function(scope, element, attrs) {


	        	scope.clickedOnce = false;
	        	$(element).find('button').click(function() {
	        		var t = $(this);
	        		if(!scope.clickedOnce)
	        		{
	        			t.addClass('expand')
	        			scope.clickedOnce = true;
	        			t.html('<i class="glyphicon glyphicon-trash"> Définitivement?</i>')
	        			t.css({position:'absolute','z-index':3, right:'22px'})
	        			var timeout = setTimeout(function() {
	        				t.removeClass('expand')
	        				scope.clickedOnce = false;
	        				t.html('<i class="glyphicon glyphicon-trash"></i>')
	        				t.css({position:'relative','z-index':3, right:'0px'})
	        			},5000)
	        		}else
	        		{
	        			// scope.click(); 
	        			t.removeClass('expand')
	        			scope.clickedOnce = false;
	        			t.html('<i class="glyphicon glyphicon-trash"></i>')
	        			t.css({position:'relative','z-index':3, right:'0px'})
	        			
	        				if(scope.image)
					        {
					        		scope.action(scope.image);
					        }else{
					        	if(scope.itemid)
					        		scope.action(scope.itemid);
					        	else
					        		scope.action();
					        	
					        }
	        		}
	        	})

      	}
     }
  })