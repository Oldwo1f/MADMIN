var nodemailer = require('nodemailer');
var moment = require('moment');
var git  = require ('gift');
var MongoClient = require('mongodb').MongoClient
// var fs = require('fs');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
		var archiver = require('archiver');
		var mds = require('mongo-dump-stream');

module.exports={
	backupDb:function(req,res) {

		console.log('backupDB');
		// console.log( moment().format('dd/mm/yyy') );
		var out = fs.createWriteStream('test/tt.db');
			out.on('end', function() {
			  console.log('there will be no more data.');
			});
		return mds.dump('mongodb://localhost:27017/madmin', out, function(err) {

			// this.unpipe(out)
			out.close();
		  console.log('Finish');
		  console.log(err);
		  if (err) { // Everything was sent 
		  }else
		  {
		  	console.log('else');
		  	setTimeout(function  (argument) {
		  		var rs = fs.createReadStream('test/tt.db')
		  		rs.pipe(res)
		  	},3000)
		  	var stat = fs.statSync('test/tt.db');
		  	console.log(stat.size);
			// res.setHeader('Content-length', stat.size);
			// res.setHeader('Content-disposition', 'attachment; filename=' + 'bdd-'+sails.config.CAMPANY_NAME+'-'+ moment().format('LL')+'.db');

		  	
		  }
		});
		// res.pipe(out);
    // When the file is done streaming, finish the Javascript string
	    
	},
	restoreDb:function(req,res) {

		console.log('restoreDB');
		var backup = fs.createReadStream('test/database-01042014.db');
		// var fs = require('fs');
		// var out = fs.createReadWriteStream('test/mydb.db');
		return mds.load('mongodb://localhost:27017/madmin', backup, function(err,d) {
		  if (!err) { // Everything was sent 
		  } 
		});
		// res.pipe(out);
    // When the file is done streaming, finish the Javascript string
	    
	},
	getTraductions:function(req,res) {


		// console.log(sails.config.i18n.locales);
		// console.log(req.params.lang);
		console.log('../nutrimarketing/config/locales/'+req.params.lang+'.json');
		// console.log(sails.config.i18n);

		// var file = fs.readFileSync('config/locales/'+req.params.lang+'.json')
		var obj = JSON.parse(fs.readFileSync(sails.config.PATH_TO_WEBSITE+'config/locales/'+req.params.lang+'.json', 'utf8'));
		// console.log(obj);
		// console.log('---');

		res.send(obj)
	},
	saveTraduction:function(req,res) {


		// console.log(sails.config.i18n.locales);
		console.log('save');
		console.log(req.params.lang);
		// console.log(req.body);
		var json = JSON.stringify(req.body,null, 2)
		console.log(json);
		// console.log('/config/locales/'+req.params.lang+'.json');
		// // console.log(sails.config.i18n);

		// var file = fs.writeFileSync('config/locales/'+req.params.lang+'.json',json)
		fs.writeFile('config/locales/'+req.params.lang+'.json', json, function (err) {
		  if (err){
			res.status(400).send('error')

		  	throw err
		  }
		  console.log('It\'s saved!');
		  res.status(200).send('saved')
		});
		
	},
	getUploadsSize:function(req,res) {

		console.log('hehhehehe');
		var totalFile=0;
		var totalImage=0;
		var totalOriginal=0;
		var totalThumbs=0;
		return Promise.bind({})
			.then(function() { 
				return fs.readdirAsync('uploads/files').map(function(filename) {
					// console.log('hehhehehe:',filename);

						return fs.statAsync('uploads/files/'+filename).then(function(stats) {
							if (stats.isFile()) { totalFile += stats.size; }
						})
				})
			}).then(function() {

				return fs.readdirAsync('uploads/originalsize').map(function(filename) {
					// console.log('hehhehehe:',filename);

						return fs.statAsync('uploads/originalsize/'+filename).then(function(stats) {
							if (stats.isFile()) { totalOriginal += stats.size; }
						})
				})
			}).then(function() {

				return fs.readdirAsync('uploads/adminThumbs').map(function(filename) {
					// console.log('hehhehehe:',filename);

						return fs.statAsync('uploads/adminThumbs/'+filename).then(function(stats) {
							if (stats.isFile()) { totalOriginal += stats.size; }
						})
				})
			}).then(function() {
				totalImage = totalOriginal+totalThumbs
				res.send({'totalImage':totalImage,'totalFile':totalFile})
			})
		
		
	},
	backupFiles:function(req,res) {
		console.log('BACKUP');
		var archive = archiver('zip');

		// var output = fs.createWriteStream('target.zip');

		// output.on('close', function () {
		//     console.log(archive.pointer() + ' total bytes');
		//     console.log('archiver has been finalized and the output file descriptor has closed.');
		// 	res.send(output)

		// });
		res.setHeader('Content-disposition', 'attachment; filename=' + 'Files-'+sails.config.CAMPANY_NAME+'-'+ moment().format('LL')+'.zip');
		archive.on('error', function(err){
		    throw err;
		});

		archive.pipe(res)
		archive.bulk([
		    { expand: true, cwd: 'uploads', src: ['**/*']}
		]);
		archive.finalize();
		
		// output.pipe(res)
		// var readStream = fs.createReadStream(filePath);
		    // We replaced all the event handlers with a simple call to readStream.pipe()
		    // readStream.pipe(res);

	},
	gitCheckout:function(req,res) {
		console.log('git');
		console.log( 'ffffffff');

		var repo = git("")
		console.log(repo);
		repo.checkout(function (err,argument) {
			console.log('err',err);
			console.log(argument);
			console.log('-----------------');
		})
	},
	getVersion:function(req,res) {
		console.log('version ');
		console.log(sails.config.PATH_TO_WEBSITE);
		json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
		version = json.version
		sitejson = JSON.parse(fs.readFileSync(sails.config.PATH_TO_WEBSITE+'package.json', 'utf8'))
		siteversion = sitejson.version
		res.send({version:version,siteversion:siteversion})
	},
	getDbStats:function(req,res) {
		console.log('here');
		var url = 'mongodb://localhost:27017/madmin';
		// Use connect method to connect to the Server
		MongoClient.connect(url, function(err, db) {
		  console.log("Connected correctly to server");
		  db.stats(function(err, stats) {
			res.send(stats)		
		    db.close();
		  })
		});
	},
	
	
}
