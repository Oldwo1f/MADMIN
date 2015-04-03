/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
		fetchAll:function(req,res,next) {
		var filter = {}
		filter.page = req.query.page || 1;
		filter.perPage = req.query.perPage || 10;
		filter.order = req.query.order || 'createdAt DESC';

		
		filter.slug = req.query.slug || '';

		async.parallel({
		    data:function(callback){
				Article.find({name:{'contains':filter.slug}}).sort(filter.order).limit(filter.perPage).skip(filter.perPage*filter.page-filter.perPage).exec(function (err,users){
					
					console.log('err==',err);
						if(err)
							callback(err)
						callback(null,users)
						
				});
		    },
		    count:function(callback){

		            Article.count({name:{'contains':filter.slug}}).exec(function (err,count){
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
	list:function(req,res,next) {
		  console.log('LIST');
				Article.find().sort('name ASC').exec(function (err,datas){
					
					if(err){
						res.status(400).send(err);
					}
					else{
						console.log(datas);
						res.status(200).send(datas)
					}
						
				});
		   
		
	},
	add:function  (req,res,next) {
		console.log('ADD ARTICLE');
		var tags = req.body.tags;
		delete req.body.tags;
		if(req.body)
		{

			Article.create(req.body).exec(function (err,data) {
				if(err)
					res.status(400).send(err)


				if(tags)
				{
					async.map(tags,function (item, callback) {
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
								results[i].nbArticles= Number(results[i].nbArticles)+1;
								results[i].save(function (err,data) {
									console.log(data);
								})
							}
						}
						console.log('data.tags.length:',data.tags.length);
						for(var i=0; i< data.tags.length;i++)
						{

							console.log('data.tags[i].text',data.tags[i].text , 'id:',data.tags[i].id);
							if(!_.contains(_.pluck(tags,'text'),data.tags[i].text)){
								data.tags.remove(data.tags[i].id);
								Tag.find(data.tags[i].id).exec(function (err,tag) {
									console.log('tag',tag);
									tag=tag[0]
									tag.nbArticles= Number(tag.nbArticles)-1;
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
					
					res.status(200).send(data)
					
				}

				// res.status(200).send(data);
			})
		}
	},
	update:function (req,res,next) {
		
		
			Article.update(req.body.id,req.body).exec(function (err,user2){
				console.log('update');
				if(err) res.status(400).send({error:err})
				user = user2[0]
				
					res.status(200).send(user)
			});
	},
	delete:function  (req,res,next) {
		sails.log('delete');
		Article.destroy(req.params.id,function (err) {
				if(err) 
					res.status(400).send(err)
				else
					res.status(200).send({deleted:req.params.id})
		})
	},
	fixture:function  (req,res,next) {
		sails.log('fixture');

		var list= ['jsArticle', 'c#', 'java', 'javascript', 'jquery', 'android' , 'php', 'c++', 'python', 'ios', 'mysql', 'iphone', 'sql', 'html', 'css', 'objective-c', 'ruby-on-rails', 'c', 'sql-server', 'ajax', 'xml', '.net', 'ruby', 'regex', 'database', 'vb.net', 'arrays', 'eclipse', 'json', 'django', 'linux', 'xcode', 'windows', 'html5', 'winforms', 'r', 'wcf', 'visual-studio-2010', 'forms', 'performance', 'excel', 'spring', 'node.js', 'git', 'apache', 'entity-framework', 'asp.net', 'web-services', 'linq', 'perl', 'oracle', 'action-script', 'wordpress', 'delphi', 'jquery-ui', 'tsql', 'mongodb', 'neo4j', 'angularJS', 'unit-testing', 'postgresql', 'scala', 'xaml', 'http', 'validation', 'rest', 'bash', 'django', 'silverlight', 'cake-php', 'elgg', 'oracle', 'cocoa', 'swing', 'mocha', 'amazon-web-services'];
		for(var i in list)
		{

			Article.create({text:list[i]}).exec(function (err,data) {
				console.log(data);
			})
		}
		
	}
};

