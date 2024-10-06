/* eslint-disable no-console */
import { Command } from 'commander';

import createOrUpdateTsConfigFile from '../actions/create-or-update-tsconfig-file';
import wait, { DEFAULT_WAIT_TIME } from '../helpers/wait.helper';
import { CommandFlags } from '../types/command-flag.type';

const tsConfigCommand = new Command('tsconfig');

tsConfigCommand
    .description('Create or update ts-config.json file to have the required settings for Zotto.')
    .option('-y, --yes', 'Accept all prompts')
    .option('-F, --fast', 'Execute the command without waiting and without showing the output')
    .action(async ({ yes, fast }: CommandFlags = { yes: false, fast: false }) => {
        console.clear();
        console.log('Updating tsconfig.json...');

        if (yes) {
            console.log('Running in yes to all mode...');
            if (!fast) {
                await wait(DEFAULT_WAIT_TIME);
            }
        }

        await createOrUpdateTsConfigFile({ yes, fast });

        console.clear();
        console.log('tsconfig.json has required settings!');
    });

export default tsConfigCommand;
