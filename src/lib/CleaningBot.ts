import { BotPosition, Command, CommandResult, MoveCommand } from './CleaningBot.types';


function move(postion: Readonly<BotPosition>, command: MoveCommand) {
  switch (command.direction) {
    case 'north':
      return { x: postion.x, y: postion.y + command.steps };
    case 'south':
      return { x: postion.x, y: postion.y - command.steps };
    case 'east':
      return { x: postion.x + command.steps, y: postion.y };
    case 'west':
      return { x: postion.x - command.steps, y: postion.y };
    default:
      throw new Error(`Invalid direction: ${command.direction}`);
  }
}

export default function handleCommand(postion: BotPosition, commands: Command[]):CommandResult {
  // this method could be recursively reducing the commands list, but this is more efficient
  // eslint-disable-next-line no-var
  var current = Object.freeze(postion);
  const visited = [current];
  commands.forEach(command => {
    if ('direction' in command) {
      current = move(current, command as MoveCommand);
      if (!visited.some(v => v.x === current.x && v.y === current.y)) {
        visited.push(current);
      }
    }
  });
  return { result: visited.length, commands: commands.length };
}
