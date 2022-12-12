import { NextFunction, Request, Response, Router } from 'express';
import BaseApi from '../abstractions/BaseApi';

export default class CleaningBotController extends BaseApi{
  /**
	 *
	 */
	// eslint-disable-next-line no-useless-constructor
	constructor() {
		super();
	}

  public register(): Router {
    return this.router.get('/enter', this.enterPostAction.bind(this));
  }

  /**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public enterPostAction(
		req: Request,
		res: Response,
		next: NextFunction,
	): void {
		try {
			res.locals.data = 1;
			// call base class method
			super.send(res);
		} catch (err) {
			next(err);
		}
	}
}
