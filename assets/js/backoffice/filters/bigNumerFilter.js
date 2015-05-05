
// app.filter "nrFormat", ->
//   (number) ->
//     if number!=undefined
//       console.log number
//       abs = Math.abs(number)
//       if abs >= Math.pow(10, 12)
//         # trillion
//         number = (number / Math.pow(10, 12)).toFixed(1)+"t"
//       else if abs < Math.pow(10, 12) and abs >= Math.pow(10, 9)
//         # billion
//         number = (number / Math.pow(10, 9)).toFixed(1)+"b"
//       else if abs < Math.pow(10, 9) and abs >= Math.pow(10, 6)
//         # million
//         number = (number / Math.pow(10, 6)).toFixed(1)+"m"
//       else if abs < Math.pow(10, 6) and abs >= Math.pow(10, 3)
//         # thousand
//         number = (number / Math.pow(10, 3)).toFixed(1)+"k"
//       number

app.filter('bigNumbers', function() {
    return function(number) {
        if (isNaN(parseFloat(number)) || !isFinite(number)) return '-';
        var abs = Math.abs(number)
        if (abs >= Math.pow(10, 12)){
            // trillion
            number = (number / Math.pow(10, 12)).toFixed(1)+"t"
        }
        else if( abs < Math.pow(10, 12) && abs >= Math.pow(10, 9)){
        // # billion
        number = (number / Math.pow(10, 9)).toFixed(1)+"Md"
        }
        else if( abs < Math.pow(10, 9) && abs >= Math.pow(10, 6)){
        // # million
        number = (number / Math.pow(10, 6)).toFixed(1)+"M"}
        else if( abs < Math.pow(10, 6) && abs >= Math.pow(10, 3)){
        // # thousand
        number = (number / Math.pow(10, 3)).toFixed(1)+"K"
        }

        return number
    }
});