import { Command } from 'commander';

const { version } = require('../../../package.json');

export interface ProgramSubCommand {
  parent?: ProgramSubCommand;

  opts(): ProgramOptions;
}

export interface ProgramOptions {}

export const extractProgramOptions = (cmd: ProgramSubCommand): ProgramOptions => {
  if (cmd.parent) {
    return extractProgramOptions(cmd.parent);
  }

  return cmd.opts();
};

export const program = new Command()
  .name('parcel-0-reveal-tools')
  .description('Commands to prepare the parcel 0 reveal')
  .version(version);

export const print = (...args: any[]) => {
  console.log(...args);
};

export const printLines = (lines: any[]) => {
  lines.forEach((line) => console.log(line));
};

export const asInt = (x) => parseInt(x, 10);
