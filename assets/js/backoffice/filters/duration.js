app.filter('duration', function() {
  return function(duration) {
  	duration=Math.round(duration)
  	var minutes = Math.floor(duration/60);
  	var secondes = duration%60;
  	var hours = Math.floor(minutes/60)
  	var minutes = minutes-(hours*60);
  	
	function pad(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
  return pad(hours,2)+':'+pad(minutes,2)+':'+pad(secondes,2)
}
});