app.directive('imageonload', function() {
    return {
        restrict: 'A',
        scope: { action:'=action',index:'=index'},
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.action(scope.index)
            });
        }
    };
});