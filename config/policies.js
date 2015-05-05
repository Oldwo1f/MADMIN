/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': ['modernBrowser','ensureAuth'],

  
  frontController: {
    
    // '*': ['isIntern'],
    '*': true,
    home:true,
    // login:true,
  },
  NotificationController:{
    '*':true,
    createNotif: true,
    validateNotifications: 'ensureAuth',
    subscribeNotif: 'ensureAuth',
    // get: true,
  },
  userController: {
    testmail : true,
    add : 'usercredentials',
    '*': [true],
    changePass: 'ensureAuth',
    editMe: 'ensureAuth',
    editpassword: 'ensureAuth',
    fetchMe: 'ensureAuth',
    'recupPassword':true,
    'changepassword':true,
    login: true,
    // add: 'isAdmin'
  },
  imageController: {
    
    '*': [true],
    
  },
  DocumentController: {
    '*': [true],
  },
  TagController: {
    '*': [true],
  },
  CategoryBlogController: {
    '*': [true],
    'add': ['ensureUniqueCatBlogName'],
  },
  ArticleController: {
    '*': ['ensureAuth'],
  },
  CategoryProjectController: {
    '*': [true],
    'add': ['ensureUniqueProjBlogName'],
  },
  ProjectController: {
    '*': ["ensureAuth"],
  },
  ImageArticleController: {
    '*': [true],
  },
  CommentController: {
    '*': [true],
  }
  ,
  ReponseController: {
    '*': [true],
  }
  ,
  ParamsController: {
    '*': [true],
  },
  ArticleTraductionController: {
    '*': [true],
  },
  DashboardController: {
    '*': [true],
  }

  
};
