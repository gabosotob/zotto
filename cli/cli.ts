#!/usr/bin/env node
import { Command } from 'commander';

import newElementCommands from './commands/new-element.command';
import tsConfigCommand from './commands/tsconfig.command';

const mainProgram = new Command();

const mapCommand = (command: any) => mainProgram.addCommand(command);

mainProgram.version('0.0.1').description('Zotto CLI tool: A tool to help you create Zotto elements.');

newElementCommands.forEach(mapCommand);
mainProgram.addCommand(tsConfigCommand);

mainProgram.parse(process.argv);
