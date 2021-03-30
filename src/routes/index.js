import express from 'express';
import { NOT_FOUND, OK } from 'http-status';
import ResponseService from '../services/response.service';
import idNumberRoute from './id-number.route';
import tinNumberRoute from './tin-number.route';
import AuthRoute from './auth.route';
import loanRoute from './loan.route';

const routes = express();

routes.use('/national-id-number', idNumberRoute);
routes.use('/tin-number', tinNumberRoute);
routes.use('/auth', AuthRoute);
routes.use('/loan', loanRoute);

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
