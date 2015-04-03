app.directive('preventSubmitEnter', function() {
  return {
    restrict: 'A',
    link: function($scope,elem,attrs) {

      elem.bind('keydown', function(e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            e.preventDefault();
            console.log('prevent');
            // var nextinput = elem.parent().next('input');
            // console.log(nextinput);
            // if (nextinput.length === 1)
            // {
            //     console.log(nextinput[0]);
            //     nextinput[0].focus();
            // }
        }
      });
    }
  }
});