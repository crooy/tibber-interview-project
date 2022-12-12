export interface BotPosition{
  x: number; y: number;
}
export interface MoveCommand{
  direction: 'north'|'south'|'east'|'west';
  steps: number;
}

export type Command = MoveCommand;
export interface CommandResult{
  result: number;
  commands: number;
}
