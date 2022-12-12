import { NextFunction, Request, Response, Router } from 'express';
import { validate } from 'express-jsonschema';
import BaseApi from '../abstractions/BaseApi';
import handleCommand from '../lib/CleaningBot';
import { CommandResult } from '../lib/CleaningBot.types';
import { CleaningBotRecord } from '../lib/CleaningBotLogTable.types';
import { EnterActionBodySchema, EnterActionRequest, Marks } from './CleaningBotController.types';

export default class CleaningBotController extends BaseApi {
  /**
   *
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  private enterSchema = EnterActionBodySchema;

  public register(): Router {
    this.router.get('/', this.rootGetAction );
    this.router.post('/enter-path', validate({ body: this.enterSchema }), this.enterPostAction);
    return this.router;
  }

  public rootGetAction = ( req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    res.locals.data = { message: 'Welcome to the Cleaning Bot API' };
    super.send(res);
  };


  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public enterPostAction = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const validRequest = req as EnterActionRequest;
      performance.mark(Marks.HANDLE_ENTER_START);
      const result = handleCommand(validRequest.body.start, validRequest.body.commands);
      performance.mark(Marks.HANDLE_ENTER_COMMAND_HANDLED);
      this.storeCleaningBotRecord(result).then((record) => {
        performance.mark(Marks.HANDLE_ENTER_LOG_STORED);
        performance.measure('cleaning-time', Marks.HANDLE_ENTER_START, Marks.HANDLE_ENTER_LOG_STORED);
        res.locals.data = { record };
        super.send(res);
      });
    } catch (err) {
      next(err);
    }
  };

  private storeCleaningBotRecord(record: CommandResult): Promise<CleaningBotRecord> {
    // store record in database
    throw new Error('Method not implemented.');
  }
}
