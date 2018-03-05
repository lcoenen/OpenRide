import * as restify from 'restify';

import messagesController from '../controllers/messages';

function messages_routes(api:restify.Server) {

	let routeCtrl = new messagesController();

	api.get('/api/rides/:id/messages', routeCtrl.get);
	api.post('/api/rides/:id/messages', routeCtrl.post);

}

module.exports.routes = messages_routes;
