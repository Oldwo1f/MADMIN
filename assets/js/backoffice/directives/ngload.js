app.directive('imageonload', function() {
    return {
        restrict: 'A',
        scope: { action:'=action',index:'=index'},
        link: function(scope, element, attrs) {
            element.bind('load', function() {

                console.log(scope.action);
                console.log(scope.index);
                console.log('imageLoaded');
                scope.action(scope.index)
            });
        }
    };
});