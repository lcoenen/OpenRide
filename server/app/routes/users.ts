import * as restify from 'restify';

import usersController from '../controllers/users';

function users_routes(api:restify.Server) {

  let routeCtrl = new usersController();
  api.get('/api/users/:id', routeCtrl.get);
  api.post('/api/users', routeCtrl.signup);
  api.del('/api/users/:id', routeCtrl.del);

	api.post('/api/users/me', routeCtrl.login);
	api.get('/api/users/me', routeCtrl.connected_user);
	api.del('/api/users/me', routeCtrl.logout);

}

module.exports.routes = users_routes;
