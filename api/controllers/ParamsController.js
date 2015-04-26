var nodemailer = require('nodemailer');
var moment = require('moment');
var git  = require ('gift');
// var fs = require('fs');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
		var archiver = require('archiver');
		var mds = require('mongo-dump-stream');

module.exports={
	backupDb:function(req,res) {

		console.log('backupDB');
		// var fs = require('fs');
		// var out = fs.createReadWriteStream('test/mydb.db');
		return mds.dump('mongodb://localhost:27017/madmin', res, function(err) {
		  if (!err) { // Everything was sent 
		  } 
		});
		// res.pipe(out);
    // When the file is done streaming, finish the Javascript string
	    
	},
	restoreDb:function(req,res) {

		console.log('restoreDB');
		var backup = fs.createReadStream('test/file.db');
		// var fs = require('fs');
		// var out = fs.createReadWriteStream('test/mydb.db');
		return mds.load('mongodb://localhost:27017/madmin', backup, function(err) {
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
		repo.pull(function (err,argument) {
			console.log('err',err);
			console.log(argument);
			console.log('-----------------');
		})
	},
	
}
