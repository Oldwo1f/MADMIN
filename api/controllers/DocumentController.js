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
		var pat= /\w+\/[-+.\w]+/g

		req.file('files').upload(reciever,function (err, files) {
	      if (err) return res.serverError(err);

	      if(pat.test(files[0].type))
	      {
			    try{
	      			fs.mkdirSync('uploads/files');
      			}
      			catch(e){
      			}

			    		var file = files[0];
			    		var ext = file.filename.substring(file.filename.lastIndexOf('.'),file.filename.length)
			    		file.name = file.filename.substring(file.filename.indexOf('-')+1,file.filename.lastIndexOf('.'))
			    		// file.description = file.filename.substring(file.filename.indexOf('-')+1,file.filename.lastIndexOf('.'))
			    		var nameOk=true
						var index=0;
						var suffix='';
						var goodname='';
						while(nameOk)
						{
							suffix='('+index+')';
							if(index==0)
								suffix='';
							var exists = IsThere.sync('uploads/files/'+file.name+suffix+ext)
							if (exists) {
							    index++
							} else {
								nameOk=false;
							    goodname=file.name+suffix+ext;
							}
						}
			    		
			    		var tmpname =file.filename;
			    		
			    		fs.writeFileSync('uploads/files/'+goodname,fs.readFileSync('.tmp/uploads/'+tmpname));
			    		
			    		file.filename = goodname;
			    		// file.description = '';
			    		file.nbDowload = Math.round(Math.random()*100)
			    		file.date = new Date();



				    		// console.log(results[0]);
			    		Document.create(file).exec(function(err,file) {
					   					
					   					
			    			return res.json({
								message: files.length + ' file(s) uploaded successfully!',
								files: file
							});
			    		});

				    	fs.unlinkSync('.tmp/uploads/'+tmpname)
						

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
	fetch:function(req,res,next) {
		
		var filter = {}
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
		    data:function(callback){
		    	// callback(null, 'emailOk');
		    		console.log('filterPage========================>' +filter.page);
		    		// {filename:{'contains':filter.slug}}
		    		// .sort(filter.order).limit(filter.perPage).skip(filter.perPage*filter.page-filter.perPage)
				Document.find({filename:{'contains':filter.slug}}).populate('tags').sort(filter.order).limit(filter.perPage).skip(filter.perPage*filter.page-filter.perPage).exec(function (err,users){
					
					console.log('err==',err);
						if(err)
							callback(err)
						callback(null,users)
						
				});
		    },
		    count:function(callback){

		    	console.log('FIND DOCUMENTS');
		            Document.count({filename:{'contains':filter.slug}}).exec(function (err,count){
						if(err)
							callback(err)
						callback(null,count)
						
				});
		    }
		},
		function(err, results){
				
				// console.log(results);
			if(err){

				res.status(401).send(err);
			}
			else{

				res.status(200).send({data:results.data,total:results.count})
			}

			

		});

	},
	serve:function  (req,res,next) {
		var filePath = 'uploads/files/'+req.params.name;
		// sails.log(filePath);
		console.log('serve');
	    // var stat = fs.statSync(filePath);
	    // console.log(stat);
	    // setTimeout(function (argument) {
	    // 	res.writeHead(200, {
		   //      // 'Content-Type': 'image/',
		   //      'Content-Length': stat.size
		   //  });

		    var readStream = fs.createReadStream(filePath);
		    // We replaced all the event handlers with a simple call to readStream.pipe()
		    readStream.pipe(res);
	    // },500)
	    // console.log(stat);
	    
	},
	update:function  (req,res,next) {
		console.log('UPDATEDOCUMENT');
		console.log(req.body);

		var newnametest = req.body.filename.substring(0,req.body.filename.lastIndexOf('.'))
		var ext = req.body.filename.substring(req.body.filename.lastIndexOf('.'),req.body.filename.length)

		console.log(ext);
		

		Document.findOne(req.body.id).populate('tags').exec(function (err,data) {

			console.log(data);
			console.log('data.tags.length 1:',data.tags.length);
			console.log(err);
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
						var exists = IsThere.sync('uploads/files/'+data.name+suffix+ext)
						if (exists) {
							console.log("//Le fichier existe deja" );
						    index++
						} else {
							nameOk=false;

							console.log("//Le fichier existe pas" );
						    nameOk=false;

						    fs.renameSync('uploads/files/'+data.filename,'uploads/files/'+data.name+suffix+ext)
						    data.filename=data.name+suffix+ext;
						}
					}

				}
			}
			if(req.body.description)
			data.description = req.body.description;
			if(req.body.date)
			data.date = req.body.date;

			if(req.body.tags)
			{
				async.map(req.body.tags,function (item, callback) {
					console.log('for',item);
					Tag.find({text:item.text}).exec(function (err,data) {
						console.log('data1',data);
						if(data.length==0)
						{
							Tag.create(item).exec(function (err,data) {
								if(err)
									callback(err)

								console.log('datacreated',data);
								callback(null,data)
							})
						}else{
							console.log('callbackExist');
							callback(null,data[0])
						}

					})

				},function (err,results) {
					if(err)
						console.log('error:' , err);

					for(var i in results)
					{
						if(!_.contains(_.pluck(data.tags, 'id'),results[i].id)){
							data.tags.add(results[i]);
							results[i].nbDocuments= Number(results[i].nbDocuments)+1;
							results[i].save(function (err,data) {
								console.log(data);
							})
						}
					}
					console.log('data.tags.length:',data.tags.length);
					for(var i=0; i< data.tags.length;i++)
					{

						console.log('data.tags[i].text',data.tags[i].text , 'id:',data.tags[i].id);
						if(!_.contains(_.pluck(req.body.tags,'text'),data.tags[i].text)){
							data.tags.remove(data.tags[i].id);
							Tag.find(data.tags[i].id).exec(function (err,tag) {
								console.log('tag',tag);
								tag=tag[0]
								tag.nbDocuments= Number(tag.nbDocuments)-1;
								tag.save(function (err,data) {
									console.log(data);
								})
							})
						}
					}

					console.log('------------------------');
					
					data.save(function (err,data) {
					if(err) res.status(400).send(err)
						res.status(200).send(data)
					});
				})
				
			}else
			{
				data.save(function (err,data) {
				if(err) res.status(400).send(err)
					res.status(200).send(data)
				});
			}
			
		})
	},
	delete:function  (req,res,next) {
		sails.log('delete');
		Document.destroy(req.params.id,function (err) {
				if(err) 
					res.status(400).send(err)
				else
					res.status(200).send({deleted:req.params.id})
		})
	}

}
