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
  '/test': 'frontController.test',
  '/dashboard': 'frontController.dashboard',
  'GET /test':'frontController.test',


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

//USER
  'POST /user/add':'UserController.add',
  'GET /user/verifyUniqueEmail/:email':'UserController.verifyUniqueEmail',
  'GET /user/verifyUniquePseudo/:pseudo':'UserController.verifyUniquePseudo',
  'GET /fetchUsers':'UserController.fetchUsers',
  'put /user':'UserController.update',
  // 'get /graphUsers':'UserController.graphUsers',
  'get /fixtureUser':'UserController.fixtureUser',
  'get /user/graph/:period':'UserController.graphUsers',
  'get /user/graph2/:role':'UserController.graphUsers2',
  'get /user/fetchMe':'UserController.fetchMe',
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
  'POST /tag/add':'TagController.add',
  'DELETE /tag/:id':'TagController.delete',
  'GET /tag/fixture':'TagController.fixture',
  // 'GET /file/download/:name':'DocumentController.serve',
  // 'POST /upload/file':'DocumentController.upload',
  // 'PUT /document':'DocumentController.update',
  


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
