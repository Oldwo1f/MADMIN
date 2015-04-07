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
		console.log("FETCHARTICLE");
		console.log('----------------------------------------------------------------------------------');
		console.log('----------------------------------------------------------------------------------');
		console.log('----------------------------------------------------------------------------------');
		console.log('----------------------------------------------------------------------------------');
		console.log('----------------------------------------------------------------------------------');
		console.log('----------------------------------------------------------------------------------');
		async.parallel({
		    data:function(callback){
				Article.find({title:{'contains':filter.slug}}).populateAll().sort(filter.order).limit(filter.perPage).skip(filter.perPage*filter.page-filter.perPage).exec(function (err,items){
					
						if(err)
							callback(err)

						// callback(null,items)
						if(items.length>0)
						{
							async.map(items,
							function(item,cb) {
								// console.log('item',item);
								async.map(item.images,
								function(item1,cb1) {
									// console.log('item1',item1);
									Image.findOne(item1.image).exec(function(err,data) {
										item1.image=data
										cb1(null,item1)
									})

								},function(err, results) {
									// console.log('results',results);
									cb(null,results)
								})
							},
							function(err,datas) {
								console.log('Final Data');
								console.log(datas);
								console.log(items);
								callback(null,items);
							})
						}else{
							callback(null)
						}
						
				});
				// Article.find({title:{'contains':filter.slug}}).populateAll().sort(filter.order).limit(filter.perPage).skip(filter.perPage*filter.page-filter.perPage).then(function(articles) {
				    
				// 	console.log('ids images',_.pluck(articles.images, 'image'));
				//     var images = Image.find({
				//         id: _.pluck(articles.images, 'image')
				//       })
				//       .then(function(images) {
				//         return images;
				//       });
				//     return [articles, images];
				// })
				// .spread(function(articles, images) {
				//     var images = _.indexBy(images, 'id');
				//     //_.indexBy: Creates an object composed of keys generated from the results of running each element of the collection through the given callback. The corresponding value of each key is the last element responsible for generating the key
				//     articles.comments = _.map(post.comments, function(comment) {
				//       comment.user = images[comment.user];
				//       return comment;
				//     });
				//     callback(null,post);
				// })
				// .catch(function(err) {
				//     if (err) {
				//       callback(err);
				//     }
				// });
		    },
		    count:function(callback){

		            Article.count({title:{'contains':filter.slug}}).exec(function (err,count){
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
		

		if(req.body)
		{
			var tags = req.body.tags;
			delete req.body.tags;
			console.log('images',req.body.images);
			if(req.body.images.length>0)
			{
						var imagesId = _.pluck(req.body.images,'id');
						console.log(imagesId);
						delete req.body.images;
			}
			
			Article.create(req.body).exec(function (err,article) {
				if(err)
					res.status(400).send(err)

				async.parallel({
				    tags: function(callback){
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
									callback(err)

								for(var i in results)
								{
									if(!_.contains(_.pluck(article.tags, 'id'),results[i].id)){
										article.tags.add(results[i]);
										results[i].nbArticles= Number(results[i].nbArticles)+1;
										results[i].save(function (err,data) {
											console.log(data);
										})
									}
								}
								console.log('article.tags.length:',article.tags.length);
								for(var i=0; i< article.tags.length;i++)
								{

									console.log('data.tags[i].text',article.tags[i].text , 'id:',article.tags[i].id);
									if(!_.contains(_.pluck(tags,'text'),article.tags[i].text)){
										article.tags.remove(article.tags[i].id);
										Tag.find(article.tags[i].id).exec(function (err,tag) {
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
								
								article.save(function (err,data) {
								if(err)
									callback(err)
									// res.status(400).send(err)
									// res.status(200).send(article)
									callback(null,article)
								});
							})
							
							
						}else{
							callback(null,[])
						}
				    },
				    images: function(callback){
				        if(imagesId)
						{
							async.map(imagesId,function (id, callback) {
								console.log('for',id);
								Image.findOne(id).exec(function (err,img) {
									
									if(err)
										console.log('error find img',err);

									Imagearticle.create({rank:Number(imagesId.indexOf(id))}).exec(function(err,imagearticle) {
										if(err)
										console.log('error create jointable',err);
										console.log('ImageArticlecreated',img);
										article.images.add(imagearticle);
										article.save(function(err,result) {
											if(err)
												console.log('error save article',err);
											img.articles.add(imagearticle);
											img.save(function(err,result) {
												if(err)
													console.log('error save img',err);
												callback(null,img)
											})
										})

									})

								})

							},function (err,results) {
								if(err)
									callback(err)

								console.log(results);
								callback(null,[])
							})
							
							
						}else{
							callback(null,[])
						}
				    }
				},
				function(err, results) {
				    // results is now equals to: {one: 1, two: 2}
				    if(err)
				    	console.log('final err',err);

				    console.log(results);

				    Article.find(article.id).populateAll().exec(function(err,data) {
				    	if(err)res.status(200).send(err)

				    		console.log(data);
				    	res.status(200).send(data)
				    })
				});
				
				
				// else
				// {
					
				// 	res.status(200).send(data)
					
				// }

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

