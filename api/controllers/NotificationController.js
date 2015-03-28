/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	subscribeNotif:function(req,res,next) {
		// 

		// console.log('home');
		Notification.watch(req);
// console.log(req.user);
		Notification.find().populate('users').sort('createdAt DESC').limit(10).exec(function (err,notifications) {
			

			// console.log(notifications);
			if(err)
				res.send(err)

			_.remove(notifications, function(val) { 

				// console.log('n',val);
				for(var i in val.users){
					if(val.users[i].id == req.user){
						return true;
						// // delete notifications[key]
						// notifications.splice(key,1)
					}
				}
				return false;
			});





			// console.log('coooooooooooooool');
			// console.log(notifications);



			res.status(200).send(notifications);
			// body...
		})


	},
	validateNotifications:function (req,res,next) {
		console.log('validateNotifications');
		// console.log(req.body);
		// console.log(req.user);
		// console.log('--------------------------------');
		var arrayID = [];
		for(var i in req.body){
			arrayID.push(req.body[i].id)
		}
		console.log(arrayID);
		Notification.find(arrayID).exec(function (err,results) {

			var item =  results[0]
			// console.log(item);
			
			if(err)	
			{	
				console.log("err");
			}
			else{
				async.map(results,function (item,callback) {
					item.users.add(req.user);
					item.save(function (err,res) {
						if(err)
						{
							callback(err)
						}else{
							callback(null,'cool')
						}
					})
					
				},function cb (err, results) {
					console.log('MAP CB FINAL');
					console.log(err);
					console.log(results);
				})
			}
		})
		

	},
	createNotif:function (req,res,next) {
		// console.log(req.body);
		// console.log('-----------------');
		// User.findOne(req.body.id).exec(function (err,user){
		// 	if(err) res.status(400).send({error:err})
		// 	var prevuser = user;

		// 	User.update(req.body.id,req.body).exec(function (err,user){
		// 		console.log('update');
		// 		if(err) res.status(400).send({error:err})
				
		// 		// if(prevuser.role == 'user' && user.role == 'admin')
		// 		// {
					Notification.create({type:'newmember',content:'bililototo est devenu membre'}).exec(function (err,notif){
								// console.log(notif)
								 // Notification.publishCreate(notif);
					    		// res.status(200).send(created);
					    	res.status(200).send(notif)
					});
		// 		// }	

				

				
		// 	});
			
		// });

	}
};

