
var nodemailer = require('nodemailer');

module.exports={
	home:function(req,res,next) {

		console.log('home');
			// User.subscribe( req.socket,[],['create'] );
		res.render('index')
	},
// 	dashboard:function(req,res,next) {

// 		console.log('home');

// 		res.render('dashboard')
// 	},
	test:function(req,res,next) {

		console.log('test');
// User.subscribe( req.socket,[],['create'] );
		res.render('test')
	}
	
}
