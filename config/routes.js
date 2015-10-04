/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'frontController.home',
  '/dashboard': 'frontController.dashboard',


//LOGIN  
  '/auth/login': 'UserController.login',
  '/api/me': 'UserController.getMe',
  // 'put /edit/me': 'UserController.editMe',
  // 'put /editpassword/me': 'UserController.editpasswordMe',


//NOTIFICATIONS  
  'GET /subscribeNotif': 'NotificationController.subscribeNotif',
  'POST /validateNotifications': 'NotificationController.validateNotifications',
  // 'post /emailme' : 'frontController.emailme',
  'get /createNotif':'NotificationController.createNotif',
  'get /createComment':'NotificationController.createComment',
  'post /project/:itemid/addComment':'NotificationController.addCommentProj',

//USER
  'POST /user/add':'UserController.add',
  'get /recupPassword/:email': 'UserController.recupPassword',
  'get /changepassword/:comfirm': 'UserController.changepassword',
  'get /addfirstadmin': 'UserController.addFirstAdmin',
  'get /testmail':'UserController.testmail',
  'GET /user/verifyUniqueEmail/:email':'UserController.verifyUniqueEmail',
  'GET /user/verifyUniquePseudo/:pseudo':'UserController.verifyUniquePseudo',
  'GET /fetchUsers':'UserController.fetchUsers',
  'put /user':'UserController.update',
  'POST /changePass':'UserController.changePass',
  // 'get /graphUsers':'UserController.graphUsers',
  'get /fixtureUser':'UserController.fixtureUser',
  'get /user/graph/:period':'UserController.graphUsers',
  'get /user/graph2/:role':'UserController.graphUsers2',
  'get /user/fetchMe':'UserController.fetchMe',
  'get /user/getauthorlist':'UserController.getauthorlist',
  'put /editProfile':'UserController.editProfile',

//IMAGES
  'GET /fetchImages':'ImageController.fetchImages',
  'GET /file/image/:size/:name':'ImageController.serveImage',
  'POST /upload/images':'ImageController.upload',
  'PUT /image':'ImageController.update',
  'DELETE /image/:id':'ImageController.delete',
//DOCUMENTS
  'GET /document/fetch':'DocumentController.fetch',
  'GET /file/download/:name':'DocumentController.serve',
  'POST /upload/file':'DocumentController.upload',
  'PUT /document':'DocumentController.update',
  'DELETE /document/:id':'DocumentController.delete',
 
//DOCUMENTS
  'GET /tag/fetch':'TagController.fetchAll',
  'GET /tag/list/:slug':'TagController.list',
  'POST /tag/add':'TagController.add',
  'DELETE /tag/:id':'TagController.delete',
  'GET /tag/fixture':'TagController.fixture',
  // 'GET /file/download/:name':'DocumentController.serve',
  // 'POST /upload/file':'DocumentController.upload',
  // 'PUT /document':'DocumentController.update',
  
//CATEGORY BLOG
  'GET /categoryBlog/fetch':'CategoryBlogController.fetchAll',
  'GET /categoryBlog/list':'CategoryBlogController.list',
  'POST /categoryBlog/add':'CategoryBlogController.add',
  'DELETE /categoryBlog/:id':'CategoryBlogController.delete',
  'PUT /categoryBlog':'CategoryBlogController.update',  

//Article 
  'GET /article/fetch':'ArticleController.fetchAll',
  'GET /article/:id':'ArticleController.fetch',
  'POST /article/add':'ArticleController.add',
  'DELETE /article/:id':'ArticleController.delete',
  'PUT /article':'ArticleController.update',

//CATEGORY BLOG
  'GET /categoryProject/fetch':'CategoryProjectController.fetchAll',
  'GET /categoryProject/list':'CategoryProjectController.list',
  'POST /categoryProject/add':'CategoryProjectController.add',
  'DELETE /categoryProject/:id':'CategoryProjectController.delete',
  'PUT /categoryProject':'CategoryProjectController.update',  
  
//Project 
  'GET /project/fetch':'ProjectController.fetchAll',
  'GET /project/:id':'ProjectController.fetch',
  'POST /project/add':'ProjectController.add',
  'DELETE /project/:id':'ProjectController.delete',
  'PUT /project':'ProjectController.update',

//Params 
  'GET /getTraductions/:lang':'ParamsController.getTraductions',
  'PUT /saveTraduction/:lang':'ParamsController.saveTraduction',
  'GET /getUploadsSize':'ParamsController.getUploadsSize',
  'GET /backupFiles':'ParamsController.backupFiles',
  'GET /backupDb':'ParamsController.backupDb',
  'GET /restoreDb':'ParamsController.restoreDb',
  'GET /gitCheckout':'ParamsController.gitCheckout',
  'GET /getVersion':'ParamsController.getVersion',
  'GET /getDbStats':'ParamsController.getDbStats',
  'GET /getLangs':'ParamsController.getLangs',
  'GET /getConfig':'ParamsController.getConfig',
  'GET /restartSite':'ParamsController.restartSite',

//DASHBOARD
  'GET /analytics/:period/:metrics':'DashboardController.analytics',
  'GET /getBestBlogger':'DashboardController.getBestBlogger',
  'GET /countAll':'DashboardController.countAll',
  'GET /getNewComments':'DashboardController.getNewComments',
  'GET /getNotifications/:page':'DashboardController.getNotifications',
  'GET /getSocials':'DashboardController.getSocials',
 
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
