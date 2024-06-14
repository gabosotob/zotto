import { Command } from 'commander';

import createOrUpdateTsConfig from '../actions/createOrUpdateTsConfig';

const tsConfigCommand = new Command('tsconfig');

tsConfigCommand
    .description('Create or update ts-config.json file to have the required settings for Zotto.')
    .action(createOrUpdateTsConfig);

export default tsConfigCommand;
