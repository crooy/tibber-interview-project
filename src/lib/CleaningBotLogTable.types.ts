export interface CleaningBotRecord{
  id: number;
  timestamp: string;
  commands: number;
  result: number;
  duration: number;
}


export interface CleaningBotNewRecord{
  commands: number;
  result: number;
  duration: number;
}
