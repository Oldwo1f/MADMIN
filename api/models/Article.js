/**
* Article.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	schema: true,
    attributes: {
  		lang : {type:'string',defaultsTo:'fr'},
  		title : {type:'string',required:true},
      	content : {type:'text',defaultsTo:null},
      	shortcontent : {type:'text',defaultsTo:null},
      	description : {type:'text',defaultTso:null},
      	rewriteurl : {type:'string',defaultsTo:null},
      	keyword : {type:'string',defaultsTo:null},
  		date : {type:'datetime',required:true},
  		nbView : {type:'int',defaultsTo:0},
  		status : {type:'string',required:true},
  		tags:{collection:'tag'},
  		category: {
            model: 'categoryBlog'
        },
        author: {
			model: 'user'
		},
        images: {
            collection: 'imagearticle',
            via:'article'
        }
    },
};

