import e from 'cors';
import { NextFunction, Request, Response, Router } from 'express';
import { validate } from 'express-jsonschema';
import BaseApi from '../abstractions/BaseApi';
import handleCommand from '../lib/CleaningBot';
import { CommandResult } from '../lib/CleaningBot.types';
import insertRecord from '../lib/CleaningBotLogTable';
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
    this.router.get('/', this.rootGetAction);
    this.router.post('/enter-path', validate({ body: this.enterSchema }), this.enterPostAction);
    return this.router;
  }

  public rootGetAction = (req: Request,
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
  public enterPostAction = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validRequest = req as EnterActionRequest;
      performance.mark(Marks.HANDLE_ENTER_START);

      const result = handleCommand(validRequest.body.start, validRequest.body.commands);
      performance.mark(Marks.HANDLE_ENTER_COMMAND_HANDLED);
      const timing = performance.measure('cleaning-time', Marks.HANDLE_ENTER_START, Marks.HANDLE_ENTER_COMMAND_HANDLED);

      const record = await this.storeCleaningBotRecord(result, timing.duration);

      performance.mark(Marks.HANDLE_ENTER_LOG_STORED);

      res.locals.data = { record };
      super.send(res);

    } catch (err) {
      next(err);
    }
  };

  private storeCleaningBotRecord(record: CommandResult, duration: number): Promise<CleaningBotRecord> {
    if (environment.isDevEnvironment() || environment.isTestEnvironment()) {
      return Promise.resolve({ ...record, duration, id: 123, timestamp: new Date().toISOString() });
    }
    // store record in database
    return insertRecord({ ...record, duration });

  }
}
