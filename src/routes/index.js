import express from 'express';
import { NOT_FOUND, OK } from 'http-status';
import ResponseService from '../services/response.service';

const routes = express();

routes.get('/', (req, res) => {
	ResponseService.setSuccess(OK, 'Loan Request API');
	return ResponseService.send(res);
});

routes.use('/', (req, res) => {
	ResponseService.setError(
		NOT_FOUND,
		'The route you are trying to access does not exists'
	);
	return ResponseService.send(res);
});

export default routes;
