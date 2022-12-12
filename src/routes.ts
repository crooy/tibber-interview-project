import { Router } from 'express';
import CleaningBotController from './controllers/CleaningBotController';


/**
 * Here, you can register routes by instantiating the controller.
 *
 */
export default function registerRoutes(): Router {
	const router = Router();

	// System Status Controller
	const cleaningBotController: CleaningBotController = new CleaningBotController();
	router.use('/tibber-developer-test', cleaningBotController.register());

	return router;
}
