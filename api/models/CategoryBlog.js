/**
* CategoryBlog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	schema: true,
  	attributes: {
  		name:{type:'string',required:true},
  		textColor:{type:'string',required:true},
  		color:{type:'string',required:true},
  		nbArticles:{type:'int',defaultsTo:0},
	}
};

