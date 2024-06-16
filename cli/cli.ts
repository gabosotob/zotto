#!/usr/bin/env node
import { Command } from 'commander';

import initCommand from './commands/init.command';
import newElementCommands from './commands/new-element.command';
import tsConfigCommand from './commands/tsconfig.command';

const mainProgram = new Command();

const mapCommand = (command: any) => mainProgram.addCommand(command);

mainProgram.version('0.0.8').description('Zotto CLI tool: A tool to help you create Zotto elements.');

newElementCommands.forEach(mapCommand);
mainProgram.addCommand(tsConfigCommand);
mainProgram.addCommand(initCommand);

mainProgram.parse(process.argv);
