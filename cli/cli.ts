#!/usr/bin/env node
import { Command } from 'commander';

import newElementCommand from './commands/new-element.command';

const program = new Command();

program.version('0.0.1').description('A simple CLI program');
program
    .command(newElementCommand.name)
    .description(newElementCommand.description)
    .action(newElementCommand.getCommand());

program.parse(process.argv);
