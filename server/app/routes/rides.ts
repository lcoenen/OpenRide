import * as restify from 'restify';
import ridesController from '../controllers/rides';
import usersController from '../controllers/users';

function rides_routes(api:restify.Server) {
  let routeCtrl = new ridesController();
  api.get('/api/rides', routeCtrl.getAll);
  api.get('/api/rides/:id', routeCtrl.get);
  api.post('/api/rides', routeCtrl.post);
  api.del('/api/rides/:id', routeCtrl.del);
  api.head('/api/rides/:id', routeCtrl.head);
}

module.exports.routes = rides_routes;
