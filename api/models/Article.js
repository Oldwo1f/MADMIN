/**
* Article.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	schema: true,
    attributes: {
  		lang : {type:'string',defaultTo:'fr'},
  		title : {type:'string',required:true},
      	content : {type:'text',defaultTo:null},
      	shortcontent : {type:'text',defaultTo:null},
      	description : {type:'text',defaultTo:null},
      	rewriteurl : {type:'string',defaultTo:null},
      	keyword : {type:'string',defaultTo:null},
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
            collection: 'image',
        }
    },
};

