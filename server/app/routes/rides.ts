import * as restify from 'restify';
import ridesController from '../controllers/rides';

function rides_routes(api:restify.Server) {
  let routeCtrl = new ridesController();
  api.get('/api/rides', routeCtrl.get);
  api.get('/api/rides/:id', routeCtrl.get);
  api.post('/api/rides', routeCtrl.post);
  api.del('/api/rides/:id', routeCtrl.del);
}

module.exports.routes = rides_routes;
