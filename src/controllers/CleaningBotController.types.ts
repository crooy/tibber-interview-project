import { BotPosition, Command } from '../lib/CleaningBot.types';

export interface EnterActionRequest extends Express.Request {
  body: {
    start: BotPosition;
    commands: Command[];
  }
}


export const Marks = {
  HANDLE_ENTER_START: 'handle-enter-start',
  HANDLE_ENTER_COMMAND_HANDLED: 'handle-enter-command-handled',
  HANDLE_ENTER_LOG_STORED: 'handle-enter-log-stored',
};

export const EnterActionBodySchema = {
  type: 'object',
  properties: {
    start: {
      type: 'object',
      required: true,
      properties: {
        x: {
          type: 'integer',
            maximum: 100000,
            minimum: -100000,
        },
        y: {
          type: 'integer',
            maximum: 100000,
            minimum: -100000,
        }
      }
    },
    commands: {
      type: 'array',
      required: true,
      maxItems: 10000,
      minItems:0,
      items: {
        type: 'object',
        properties: {
          direction: {
            required: true,
            type: 'string',
            enum: ['north', 'south', 'east', 'west']
          },
          steps: {
            type: 'integer',
            maximum: 100000,
            minimum: -100000,
            required: true,
          }
        }
      }
    }
  }
};
