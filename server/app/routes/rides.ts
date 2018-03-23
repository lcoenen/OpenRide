import * as restify from 'restify';
import ridesController from '../controllers/rides';
import usersController from '../controllers/users';

function rides_routes(api:restify.Server) {
  let routeCtrl = new ridesController();
  api.get('/api/rides', routeCtrl.getAll);
  api.get('/api/rides/:id', routeCtrl.get);
	api.put('/api/rides/:id', routeCtrl.put);
  api.del('/api/rides/:id', routeCtrl.del);
	api.head('/api/rides/:id', routeCtrl.head);

	/*
	 *
	 * Allow join / depart from ride with options 'join/depart'
	 * 
	*/
	api.patch('/api/rides/:id', routeCtrl.patch);

  /*
	 *
	 * Matching routes
	 *
	*/
	api.get('/api/rides/:id/matches', routeCtrl.getMatches);
	api.get('/api/rides/:id/requests', routeCtrl.getRequests);
	api.post('/api/rides/:id/requests', routeCtrl.postRequests);

}

module.exports.routes = rides_routes;
