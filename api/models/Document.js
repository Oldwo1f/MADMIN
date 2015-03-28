/**
* Document.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var fs = require('fs'), Writable = require('stream').Writable;
module.exports = {
	schema: true,
  	attributes: {
  		filename:{type:'string',required:true},
  		name:{type:'string',required:true},
  		description:{type:'text'},
  		nbDowload:{type:'int'},
  		size:{type:'int'},
  		type:{type:'string'},
  		
	},
  	beforeDestroy: function (values, cb) {
  // 		console.log(values);
   		Document.findOne(values.where.id).populateAll().exec(function(err,item) {
		// 	console.log('-------------------------------------------------------');
		// 	console.log(img);



			async.parallel([
				function(callback){
			        
			        
			        // if(img.ingredient) 
			        // {

			    //     	console.log('-------------------------------------------------img.user');
			    //     	console.log(img.ingredient);
			    //     	console.log(img.ingredient.id);
				   //      Ingredient.findOne(img.ingredient.id).populate('images').exec(function(err,res) {
				   //      	console.log(res);
				   //      	console.log(err);
				   //      	async.each(res.images, function(image, cb2) {

				   //      		if(Number(image.index) > Number(img.index))
				   //      		{
				   //      			image.index = Number(image.index)-1;
				   //      			Image.update(image.id,image,function() {
				   //      				cb2(null);
				   //      			})

				   //      		}else{
							//     	cb2(null);
				   //      		}
							  
							// }, function(err){
							//     if( err ) {
							//       console.log('A file failed to process');
							//     } else {
							//       	console.log('All files have been processed successfully');
				        			callback(null)

							//     }
							// });
				   //      });

			        // }



			    },
		
			    function(callback){
					try{
			            fs.unlink('uploads/files/'+item.filename)
			        }catch(e){

			        }
			        callback(null)
			    }
			],
			// optional callback
			function(err, results){
				if (err) {
					console.log('ERRRRRRRROR');
					sails.log(err)
				};
			    // the results array will equal ['one','two'] even though
			    // the second function had a shorter timeout.
			    return cb();
			});

		});
  	}
};

