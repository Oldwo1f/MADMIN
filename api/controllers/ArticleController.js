/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var Q = require('q')
 var Promise = require('bluebird');

module.exports = {
		fetchAll:function(req,res,next) {
		var filter = {}
		filter.page = req.query.page || 1;
		filter.perPage = req.query.perPage || 10;
		filter.order = req.query.order || 'createdAt DESC';

		
		filter.slug = req.query.slug || '';
		
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
	fetch:function(req,res,next) {
		
		console.log("FETCH ONE ARTICLE");
		
				Article.find(req.params.id).populateAll().exec(function (err,items){
					
						if(err)
							callback(err)

						// callback(null,items)
						if(items.length>0)
						{
								var article= items[0];
								// console.log('item',item);
								async.series({
								image:function(cbparalelle) {
									async.map(article.images,
									function(item1,cb1) {
										// console.log('item1',item1);
										Image.findOne(item1.image).exec(function(err,data) {
											item1.image=data
											cb1(null,item1)
										})

									},function(err, results) {
										// console.log('results',results);
										cbparalelle(null,results)
									})
								},
								document:function(cbparalelle) {
									async.map(article.documents,
									function(item1,cb1) {
										// console.log('item1',item1);
										Document.findOne(item1.document).exec(function(err,data) {
											item1.document=data
											cb1(null,item1)
										})

									},function(err, results) {
										// console.log('results',results);
										cbparalelle(null,results)
									})
								},
								comment:function(cbparalelle) {
											console.log('------------------------------');
											// console.log(article.comments);
											var allcomments = [];
									async.mapSeries(article.comments,
									function(item1,cb1) {
										console.log('item1',item1);
										Comment.find(item1.id).populate('reponses').exec(function(err,data) {
											// item1.comment=data
											console.log(data);
											console.log('------------------------------');
											// console.log(article.comments.indexOf(item1));
											// item1=data
											// article.comments.splice(article.comments.indexOf(item1),1,data[0])
											allcomments.push(data[0])
											// console.log(data);
											cb1(null,item1)
										})

									},function(err, results) {
										
										article.comments=allcomments;
										console.log('allcomments',allcomments);
										cbparalelle(null,allcomments)
									})
								}},function(err,ress) {

 										console.log('DELETE');
									if(article.category)
										article.category=article.category.id;
									if(article.author)
										article.author=article.author.id;

									var articletogo = _.clone(article)

									delete articletogo.comments
									articletogo.comments=ress.comment
									console.log(articletogo.comments);
									console.log(articletogo);
									console.log('Final Data');
									console.log('fetch ONE Article', articletogo);
									res.status(200).send(articletogo)
								})
								
							}
							
								
								// callback(null,items);

	
						
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
			if(req.body.documents.length>0)
			{
						var documentsId = _.pluck(req.body.documents,'id');
						console.log(documentsId);
						delete req.body.documents;
			}
			req.body.author = req.user;

			console.log(req.user);
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
				    },
				    documents: function(callback){
				        if(documentsId)
						{
							async.map(documentsId,function (id, callback) {
								console.log('for',id);
								Document.findOne(id).exec(function (err,doc) {
									
									if(err)
										console.log('error find img',err);

									Documentarticle.create({rank:Number(documentsId.indexOf(id))}).exec(function(err,documentarticle) {
										if(err)
										console.log('error create jointable',err);
										console.log('DocumentArticlecreated',doc);
										article.documents.add(documentarticle);
										article.save(function(err,result) {
											if(err)
												console.log('error save article',err);
											doc.articles.add(documentarticle);
											doc.save(function(err,result) {
												if(err)
													console.log('error save img',err);
												callback(null,doc)
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
				    },
				    category: function(callback){
				        if(req.body.category)
						{
							

									CategoryBlog.findOne(req.body.category).exec(function(err,category) {
										
										category.nbArticles= Number(category.nbArticles)+1;
										category.save(function(err,category1) {
											if(err)
												console.log('error save article',err);
									
												callback(null,category1)
											
										})

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
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log('------------------------------------');
				    		console.log(data);

				    	Notification.create({type:'articlecreated',status:'ok',info1:req.body.title,info2:'par '+data[0].author.pseudo}).exec(function (err,notif){
				    		if(err)
				    			console.log(err);
				    		notif.users.add(req.user);
				    		notif.save()
				    		console.log('notif',notif);
				    		// Notification.publishCreate(notif,req)
				    	})
						
				
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
		
		console.log('EDIT ARTICLE');
		if(req.body)
		{
			var tags = req.body.tags;
			var imagesTab = req.body.images;
			var documentsTab = req.body.documents;
			var commentsTab = req.body.comments;
			var translations = req.body.translations;
			var oldcategory = '';
			// console.log(req.body);
			console.log(req.body.id);

			return Promise.bind({})
			.then(function find_article(){
			    return Article.findOne(req.body.id).populateAll()
			})
			.then(function save_article(oldarticle){
				this.oldcategory=false;
				if(typeof(oldarticle.category)=='object')
					this.oldcategory = oldarticle.category.id

				console.log('this.oldcategory',this.oldcategory);
			    this.article = oldarticle;
			    oldarticle.title= req.body.title;
			    oldarticle.content= req.body.content;
			    oldarticle.shortcontent= req.body.shortcontent;
			    oldarticle.description= req.body.description;
			    oldarticle.rewriteurl= req.body.rewriteurl;
			    oldarticle.keyword= req.body.keyword;
			    oldarticle.date= req.body.date;
			    console.log('here');
			    oldarticle.category= req.body.category;
			        console.log('here2');
			    oldarticle.author= req.body.author;
			    oldarticle.status= req.body.status;
			    oldarticle.publishVideo= req.body.publishVideo;
			    // console.log(req.body.activeComent);
			    oldarticle.activeComent= req.body.activeComent;
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    console.log('thisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthisthis');
			    oldarticle.video= req.body.video;

			    console.log(req.body.video);
			    return this.article.save()
			    
			})
			.then(function(articlesaved) {
				console.log(this.oldcategory);
				var oldCat = this.oldcategory
				this.article = articlesaved;
				console.log(this.oldcategory);
				return new Promise(function(resolve,rej){
					if(oldCat){
						console.log('OLD CATEGORY');
						console.log(' ADD -1');
						return CategoryBlog.findOne(oldCat).then(function(category) {
							// console.log('------>',category.nbArticles);
							console.log(category.nbArticles);
							category.nbArticles= Number(category.nbArticles)-1;
							console.log(category.nbArticles);
							return category.save(function() {resolve(true)})
						})
					}else{
			        	resolve(true)
						
					}
			    });
				// console.log('oldcategory',oldcategory);
				
			}).then(function() {
				// console.log('oldcategory',oldcategory);
				console.log('articlesaved',this.article.category);
				if(this.article.category){
					console.log(' ADD +1');
					return CategoryBlog.findOne(this.article.category.id).then(function(category) {
						console.log('------>',category.nbArticles);
						category.nbArticles= Number(category.nbArticles)+1;
						console.log('------>',category.nbArticles);
						return category.save(function(saved) { console.log('saved :',saved);
							return true;})
					})
				}else{
					return true;
				}
			})
			.then(function find_or_create_tags(savedarticle) {
				// console.log('savedarticle',savedarticle);
				
				return Promise.map(tags,function(tag){
			        return Tag.findOrCreate({text:tag.text},tag);
			    })
			})
			.then(function link_tag_to_article(foundTags){
			     var thisArticle = this.article;
			    _.forEach(foundTags,function(tag){

			    	if(!_.contains(_.pluck(thisArticle.tags, 'id'),tag.id)){
						thisArticle.tags.add(tag);
						tag.nbArticles= Number(tag.nbArticles)+1;
						tag.save(function (err,data) {
						})
					}

			    });
			    for(var i=0; i< thisArticle.tags.length;i++)
				{

					if(!_.contains(_.pluck(tags,'text'),thisArticle.tags[i].text)){
						// console.log('-----------------------------------------------------');
						thisArticle.tags.remove(thisArticle.tags[i].id);
						Tag.find(thisArticle.tags[i].id).exec(function (err,tag) {
							// console.log('tag',tag);
							tag=tag[0]
							tag.nbArticles= Number(tag.nbArticles)-1;
							tag.save(function (err,data) {
		
							})
						})
					}
				}
			    return new Promise(function(resolve,rej){
			        //thisArticle is available here since it's defined in the outer scope
			        thisArticle.save(function(err,data) {
			        	resolve(data)
			        });
			    });
			})
			.then(function (thisArticle){
			    // console.log('--------------->>>>', thisArticle);
			    return Promise.map(imagesTab,function(imagearticle,index){
			        return new Promise(function(resolve,rej){

			        	Imagearticle.find({id:imagearticle.id}).then(function(foundedimagesarticles) {
			        		// console.log('foundedimagesarticles',foundedimagesarticles);
			        		if(foundedimagesarticles.length!=0)
			        		{
			        			resolve([foundedimagesarticles[0],index])
			        		}else{
			        			// resolve(
			        				// console.log(imagearticle.image);
			        				return Image.find({id:imagearticle.image.id}).then(function(img) {
				        				return Imagearticle.create({rank:0}).then(function(createdimagearticle) {
				        					// console.log('img',img);
				        					createdimagearticle.image = img[0].id;
				        					createdimagearticle.article = thisArticle.id;
				        					return createdimagearticle.save().then(function(data){
				        						// imagesTab.splice(imagesTab.indexOf(imagearticle),1,data)
				        						// console.log('data',data);
				        						resolve([data,index])
				        					})
				        				})
				        			})
			        			// )
			        			
			        		}
			        	})

			    	})
			    })
			})
			.then(function (imgarticle,index){
				return Promise.map(imgarticle,function(datas) {
					return Imagearticle.update(datas[0].id,{rank:datas[1]})
				})
			})
			.then(function (){
					
				return Promise.map(this.article.images,function(oldimg) {
					if(!_.contains(_.pluck(imagesTab,'id'),oldimg.id)){
						// console.log('NOT CONTAIN imagearticle');
						return Imagearticle.destroy(oldimg.id)
					}else{
						return true;
					}
				})
				
			})
			.then(function (){
				var thisArticle=this.article;
			    // console.log('--------------->>>>', thisArticle);
			    return Promise.map(documentsTab,function(documentarticle,index){
			        return new Promise(function(resolve,rej){

			        	Documentarticle.find({id:documentarticle.id}).then(function(foundeddocumentsarticles) {
			        		// console.log('foundeddocumentsarticles',foundeddocumentsarticles);
			        		if(foundeddocumentsarticles.length!=0)
			        		{
			        			resolve([foundeddocumentsarticles[0],index])
			        		}else{
			        			// resolve(
			        				// console.log(documentarticle.document);
			        				return Document.findOne({id:documentarticle.document.id}).then(function(doc) {
			        					// console.log('doc',img);
				        				return Documentarticle.create({rank:0}).then(function(createddocumentarticle) {
				        					// console.log('img',img);
				        					createddocumentarticle.document = doc.id;
				        					createddocumentarticle.article = thisArticle.id;
				        					return createddocumentarticle.save().then(function(data){resolve([data,index])})
				        				})
				        			})
			        			// )
			        			
			        		}
			        	})

			    	})
			    })
			})
			.then(function (docarticle,index){
				// imgarticle.rank=
				// console.log(docarticle);
				// console.log('------' );
				return Promise.map(docarticle,function(datas) {
					datas[0].rank=datas[1]
					return datas[0].save()
				})
				// return imgarticle
			})
			.then(function (){
					
				return Promise.map(this.article.documents,function(oldimg) {
					// console.log('olddoc',oldimg);
					if(!_.contains(_.pluck(documentsTab,'id'),oldimg.id)){
						// console.log('NOT CONTAIN documentarticle');
						return Documentarticle.destroy(oldimg.id)
					}else{
						return true;
					}
				})
				
			})
			.then(function (){
				var thisArticle=this.article;
			    // console.log('--------------->>>>', thisArticle);
			    return Promise.map(commentsTab,function(comment){
			    	
				    	var status= comment.status;
				    	var reponses= comment.reponses;
				    	// console.log('comment.comments',comment.comments);

				    			return new Promise(function(resolve,rej){

						        	Comment.find({id:comment.id}).populateAll().then(function(founded) {
						        		// console.log('foundeddocumentsarticles',foundeddocumentsarticles);
						        		if(founded.length!=0)
						        		{
						        			resolve([founded[0],status])
						        		}else{
						        			// resolve(
						        				// console.log(documentarticle.document);
							        				return Comment.create(comment).then(function(createdcomment) {
							        					// console.log('img',img);
							        					createdcomment.article = thisArticle.id;
							        					// console.log('HERE2');
							        					// createddocumentarticle.article = thisArticle.id;
							        					return createdcomment.save().then(function(data){resolve([data,status])})
							        				})

						        			// )
						        			
						        		}
						        	})
						    	}).then(function(result) {
						    		return new Promise(function(resolve,rej){

							    		if(reponses){
								    		
							    			// var reponses = comment.reponses;

								    		// console.log('COmment.reponses',reponses);
								    		
										    	return Promise.map(reponses,function(reponse){

										    		// console.log("reponse",reponse);
										    		// console.log("reponse.id",reponse.id);
										    		// console.log('CREATE');
										    		if(reponse.id)
										    		{
										    			return Reponse.findOne(reponse.id).then(function(re){

										    			// data.comment = comment.id
										    			// return data
										    				// console.log('datafound',re);
										    				re.status= reponse.status;
											    			return re.save().then()

										    			// resolve(then)
										    			})
										    		}else{
										    			// console.log(comment.id);
										    			reponse.comment=comment.id
										    			return Reponse.create(reponse).then(function(re){
										    				// console.log('re',re);
										    				re.comment=comment.id
											    			// console.log('data',re);
											    			// console.log('commentId=',comment.id);
											    			// console.log('commentId=',comment.id);
											    			// re.comment.add(comment.id);
											    			// re.email= 'comment@ttttttttttttttttttttttttttttttttttttttttttttttt.fr';
											    			return re.save().then()
										    			})
										    		}
										    		

										    	}).then(function(c) {

										    		// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><',c);
					
													// return Promise.map(c.comments,function(oldcom) {
													// 	// console.log('olddoc',oldimg);
													// 	if(!_.contains(_.pluck(commentsTab,'id'),oldcom.id)){
													// 		console.log('NOT CONTAIN');
													// 		return Comment.destroy(oldcom.id).then(function() {
													// 			resolve(result)
													// 		})

													// 	}else{
															resolve(result)
													// 	}
													// })
				
			
							    					 

										    	}) 
						    		// resolve(then)
					    				}else{
							    			resolve(result) 
							    		}
						    		})
						    	})
						    		
				    	
			    })
			})

			.then(function (comments,index){
				// console.log('HERE3');
				// imgarticle.rank=
				// console.log(comments);
				// console.log('------' );
				return Promise.map(comments,function(datas) {
					// console.log('datas',datas);
					// console.log('datas',datas);
					var com = datas[0];
					// console.log(com);
					var status = datas[1];
					// console.log(status);
					// data=datas[0]
					// console.log(data);
					// delete com.reponses;
					com.status=status;
					return Comment.update(com.id,{status:status})
				})
				// return imgarticle
			})
			.then(function(comments) {
			    	return Promise.map(comments,function(oldcom) {
					// console.log('oldcom',oldcom);
						return Comment.findOne(oldcom[0].id).populate('reponses').then(function(foundedCom) {
							// console.log('foundedCom',foundedCom);
							// console.log('commentsTab',commentsTab);
							// console.log(_.pluck(commentsTab,'id'));
							var foundedInTabs = _.find(commentsTab,function(c) {
								// console.log('c',c);
								if(c.nouvo==true)
									return true
								else
									return c.id ==foundedCom.id}
								);
							// console.log('foundedInTabs',foundedInTabs);

							return Promise.map(foundedCom.reponses,function(rep) {
								// console.log('rep',rep);
								if(!_.contains(_.pluck(foundedInTabs.reponses,'content'),rep.content))
								{
									// console.log('NOT CONTAINT reponse');
									return Reponse.destroy(rep.id)
								}else
								{
									return true
								}
							})
							
						})
					// if(!_.contains(_.pluck(commentsTab,'id'),oldcom.id)){
					// 	console.log('NOT CONTAIN');
					// 	return Comment.destroy(oldcom.id)
					// }else{
					// 	return true;
					// }
				})
			})
			.then(function (){
					
				return Promise.map(this.article.comments,function(oldcom) {
					// console.log('olddoc',oldimg);
					if(!_.contains(_.pluck(commentsTab,'id'),oldcom.id)){
						// console.log('NOT CONTAIN Comment');
						return Comment.destroy(oldcom.id)
					}else{
						return true;
					}
				})
				
			})

			.then(function() {
				var oldtrans = this.article.translations
				return Promise.map(translations,function(translation) {
					// console.log(translation.id);
					// console.log(translation);
					if(translation.id){
						return ArticleTraduction.findOne(translation.id).then(function(founded) {
							return ArticleTraduction.update(translation.id,translation)
						})
					}else{
						translation.article = req.body.id;
						// console.log('translation = this.article.id;',req.body.id);
						return ArticleTraduction.create(translation).then(function(founded) {
							// console.log('founded',founded);
							founded.article = req.body.id
							return founded.save().then(function(toto) {
								// console.log('toto',toto);
							})

						})
					}
					
				}).then(function() {
					return Promise.map(oldtrans,function(trans) {
						// console.log('trans',trans);
					if(!_.contains(_.pluck(translations,'id'),trans.id))
					{
						// console.log('NOT CONTAINT reponse');
						return ArticleTraduction.destroy(trans.id)
					}else
					{
						return true
					}
					})
					
				})
			})
			.then(function (){
				return Notification.find({'item':'article','itemid':req.body.id,'status':{'!' :['ok']}}).then(function (arguments) {
					return Promise.map(arguments,function (item) {
						item.status='ok';

						return item.save().then(function function_name (item) {
							Notification.publishUpdate(item.id,item)
						});
					})
					// body...
				})
			})
			.then(function (){
				return Article.findOne(req.body.id).populateAll()
			})
			.then(function (article){
				// console.log(article);
				this.article = article
				return Promise.map(article.images,function(imagearticle) {
					return Imagearticle.findOne(imagearticle.id).populate('image')
				})
			})
			.then(function (allimage){
				this.article.images = allimage
				if(this.article.category)
				this.article.category = this.article.category.id
				if(this.article.author)
				this.article.author = this.article.author.id
				return Promise.map(this.article.documents,function(documentarticle) {
					return Documentarticle.findOne(documentarticle.id).populate('document')
				})
			})
			.then(function (alldocument){
				// console.log('alldocument',alldocument);
				this.article.documents = alldocument
				return Promise.map(this.article.comments,function(comment) {
					return Comment.findOne(comment.id).populate('reponses')
				})
			})
			.then(function (allcomment){
				// console.log('allcomment',allcomment);
				var articletogo = _.clone(this.article)
				articletogo.comments = allcomment;
				this.article = articletogo;
				
			})
			.done(function() {
				console.log('DONE');
				// console.log(this.article);
				res.status(200).send(this.article)
				// this.article.save(function(err,data) {
				// 	console.log('SAVED');
				// })
			},function(e) {
				console.log('ERROR FUNCTION');
				console.log(e);
				res.status(400).send(e)
			});
			


		}
		else{
			return res.status(400).send('no body');
		}
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
	test:function  (req,res,next) {
		console.log('test');
			Imagearticle.findOne('55272c8079d1323f1c3150a6').exec(function (err,result) {
				if(err) console.log(err);
				else{

				console.log('result1',result);
				result.rank ='tititit'
				
				// console.log('result2',result);
				result.save(function(err,resu) {
					if(err) console.log(err);
					res.send(resu)

				});
				}
				

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

