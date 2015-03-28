/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		type: {type:'string',required:true},
  		forwho: {type:'string',required:true,defaultsTo:'all'},
	    content: {type:'string',required:true},
	    users:{
            collection: 'user'
        }
  },
  afterUpdate: function(post, cb){

    Notification.publishUpdate(post.id, {});
    cb();

  },
  afterCreate: function(post, cb){

    Notification.publishCreate(post);
    cb();

  }
};

