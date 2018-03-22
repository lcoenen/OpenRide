import * as restify from 'restify';

import usersController from '../controllers/users';

function users_routes(api:restify.Server) {

  let routeCtrl = new usersController();
  api.get('/api/users/:id', routeCtrl.get);
  api.post('/api/users', routeCtrl.signup);
  api.del('/api/users/:id', routeCtrl.del);

}

module.exports.routes = users_routes;
