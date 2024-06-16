import { Command } from 'commander';

import initZottoProject from '../actions/init-zotto-project';

const initCommand = new Command('init');

initCommand
    .description('Create or update ts-config.json file to have the required settings for Zotto.')
    .option('-y, --yes', 'Accept all prompts')
    .action(initZottoProject);

export default initCommand;
