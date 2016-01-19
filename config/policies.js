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

  '*': ['modernBrowser','isAdmin'],

  
  frontController: {
    
    // '*': ['isIntern'],
    '*': true,
    home:true,
    // login:true,
  },
  NotificationController:{
    '*':'isAdmin',
    // createNotif: true,
    // createComment: true,
    // addCommentProj: true,
    validateNotifications: 'isAdmin',
    subscribeNotif: 'isAdmin',
    // get: true,
  },
  userController: {
    '*': 'isAdmin',
    'recupPassword':true,
    'changepassword':true,
    // 'fixtureUser':true,
    'addFirstAdmin':true,
    login: true,
  },
  imageController: {
    
    '*': 'isAdmin',
    'serveImage':true
    
  },
  DocumentController: {
    '*': 'isAdmin',
  },
  TagController: {
    '*': 'isAdmin',
  },
  CategoryBlogController: {
    '*': 'isAdmin',
    'add': ['ensureUniqueCatBlogName'],
  },
  ArticleController: {
    '*': 'isAdmin',
  },
  HtmlController: {
    '*': true,
  },
  CategoryProjectController: {
    '*': 'isAdmin',
    'add': ['ensureUniqueProjBlogName'],
  },
  ProjectController: {
    '*': 'isAdmin',
  },
  ImageArticleController: {
    '*': 'isAdmin',
  },
  CommentController: {
    '*': 'isAdmin',
  }
  ,
  ReponseController: {
    '*': 'isAdmin',
  }
  ,
  ParamsController: {
    '*': 'isAdmin',
    'getLangs': 'isAdmin',
    'getConfig': 'isAdmin',
  },
  ArticleTraductionController: {
    '*': 'isAdmin',
  },
  DashboardController: {
    '*': 'isAdmin',
    'analytics': true,
  }

  
};
