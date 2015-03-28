var fs = require('fs'), Writable = require('stream').Writable;
var sid = require('shortid');
var easyimg = require('easyimage');
var IsThere = require("is-there");

module.exports={
	upload:function(req,res) {

		res.setTimeout(0);
		sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
		sid.seed(10);
		// var stuff = JSON.parse(req.body.resizeStuff);

		var reciever = new Writable({objectMode: true});
		reciever._write = function(file, enc, cb) {
			file.filename=safeFilename(sid.generate()+'-'+file.filename)
			var output = require('fs').createWriteStream('.tmp/uploads/'+file.filename);

			var transfert = file.pipe(output);
			transfert.on('finish', function () {
				cb();
			});
		};
		var pat=new RegExp('image')

		req.file('imgs').upload(reciever,function (err, files) {
	      if (err) return res.serverError(err);

	      console.log(files[0]);

	      if(pat.test(files[0].type))
	      {
	      	
			    try{
	      			fs.mkdirSync('uploads/adminThumbs');
      			}
      			catch(e){
      			}

			    try{
	      			fs.mkdirSync('uploads/originalsize');
      			}
      			catch(e){
      			}

      			console.log('BEFORE THIUMNAIL');
      			fs.writeFileSync('uploads/originalsize/'+files[0].filename,fs.readFileSync('.tmp/uploads/'+files[0].filename));

console.log('.tmp/uploads/'+files[0].filename);
	      		easyimg.thumbnail(
				    {
				        src:'.tmp/uploads/'+files[0].filename,
				        dst:'uploads/adminThumbs/'+files[0].filename,
				        width:200, height:200
				        // cropwidth:item.cropWidth, cropheight:item.cropHeight,
				        // x:item.x, y:item.y,
				        // gravity: 'NorthWest',fill:true
				    }).then(
				    function success(image) {
				        	

				        	console.log('THEN THIUMNAIL');
			    		var img = files[0];
			    		
			    		
			    		img.name = img.filename.substring(img.filename.indexOf('-')+1,img.filename.lastIndexOf('.'))
			    		img.alt = img.filename.substring(img.filename.indexOf('-')+1,img.filename.lastIndexOf('.'))
			    		
			    		console.log(img.nbDowload);
			    		
			    			console.log(req.body);



				    		// console.log(results[0]);
			    		Image.create(img).exec(function(err,img) {
					   					
					   					
			    			return res.json({
								message: files.length + ' file(s) uploaded successfully!',
								files: img
							});
			    		});

				    	fs.unlinkSync('.tmp/uploads/'+files[0].filename)
						

				    },
				    function error(err){
				    	console.log('err');
				    	console.log(err);
				    }
				);




	   

	      }else
	      {
	      	//NOT an IMAGE
	      	return res.json({
		        message: 'Ce fichier n\'est pas une image',
		        files: files
		      });
	      }








	      
	    });




		function safeFilename(name) {
			name = name.replace(/ /g, '-');
			name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
			name = name.replace(/\.+/g, '.');
			name = name.replace(/-+/g, '-');
			name = name.replace(/_+/g, '_');
			return name;
		}

	},
	fetchImages:function(req,res,next) {
		console.log("HERE fetchImages");

		console.log(req.params);
		console.log(req.query);
		var filter = {}
		console.log('req.params');
		console.log();
		filter.page = req.query.page || 1;
		filter.perPage = req.query.perPage || 10;
		filter.order = req.query.order || 'date DESC';

		// console.log(filter.order);
		// filter.role=[]
		// console.log(req.query.membre);
		// if(req.query.member=='false'){

		// }else{
		// 	filter.role.push('member')
		// }if(req.query.admin=='false'){

		// }else{
		// 	filter.role.push('admin')
		// }if(req.query.user=='false'){

		// }else{
		// 	filter.role.push('user')
		// }
		// console.log(filter.role);
		filter.slug = req.query.slug || '';
		// var nbPerPage = 30;

		async.parallel({
		    images:function(callback){
		    	// callback(null, 'emailOk');
		    		console.log('filterPage========================>' +filter.page);
				Image.find({filename:{'contains':filter.slug}}).sort(filter.order).limit(filter.perPage).skip(filter.perPage*filter.page-filter.perPage).exec(function (err,users){
					console.log('FINDUSER');
					sails.log(err);
						if(err)
							callback(err)
						callback(null,users)
						// res.status(200).send({users:users,total:})
						
				});
		    },
		    countimages:function(callback){

		    	console.log('COUNTUSER');
		            Image.count({filename:{'contains':filter.slug}}).exec(function (err,count){
		            	sails.log(err);
						if(err)
							callback(err)
						callback(null,count)
						// res.status(200).send({users:users,total:})
						
				});
		    }
		},
		function(err, results){
				console.log('parrarell error');
				sails.log(err);
				// console.log(results);
			if(err){

				res.status(401).send(err);
			}
			else{

				res.status(200).send({images:results.images,total:results.countimages})
			}

			

		});

	},
	serveImage:function  (req,res,next) {
		var filePath = 'uploads/'+req.params.size+'/'+req.params.name;
		// sails.log(filePath);
	    var stat = fs.statSync(filePath);
	    setTimeout(function (argument) {
	    	res.writeHead(200, {
		        // 'Content-Type': 'image/',
		        'Content-Length': stat.size
		    });

		    var readStream = fs.createReadStream(filePath);
		    // We replaced all the event handlers with a simple call to readStream.pipe()
		    readStream.pipe(res);
	    },500)
	    // console.log(stat);
	    
	},
	update:function  (req,res,next) {
		console.log('UPDATEIMAGE');
		console.log(req.body);

		var newnametest = req.body.filename.substring(0,req.body.filename.lastIndexOf('.'))
		var ext = req.body.filename.substring(req.body.filename.lastIndexOf('.'),req.body.filename.length)

		console.log(ext);
		

		Image.findOne(req.body.id,function (err,data) {
			if(err) res.status(400).send(err)
			
			if(req.body.name){
				data.name = req.body.name;
				if(newnametest!=req.body.name && newnametest!=data.name){
					console.log('COOOL');
					var nameOk=true
					var index=0;
					var suffix='';
					while(nameOk)
					{
						console.log("while");
						suffix='('+index+')';
						if(index==0)
							suffix='';
						var exists = IsThere.sync('uploads/adminThumbs/'+data.name+suffix+ext)
						if (exists) {
							console.log("//Le fichier existe deja" );
						    index++
						} else {
							nameOk=false;

							console.log("//Le fichier existe pas" );
						    nameOk=false;

						    fs.renameSync('uploads/adminThumbs/'+data.filename,'uploads/adminThumbs/'+data.name+suffix+ext)
						    fs.renameSync('uploads/originalsize/'+data.filename,'uploads/originalsize/'+data.name+suffix+ext)
						    data.filename=data.name+suffix+ext;
						}
					}

				}
			}
			if(req.body.alt)
			data.alt = req.body.alt;

			data.save(function (err,data) {
				if(err) res.status(400).send(err)
					res.status(200).send(data)
			});
		})
	},
	delete:function  (req,res,next) {
		sails.log('delete');
		Image.destroy(req.params.id,function (err) {
				if(err) 
					res.status(400).send(err)
				else
					res.status(200).send({deleted:req.params.id})
		})
	}

}
