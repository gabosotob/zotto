/* eslint-disable no-console */
import { Command } from 'commander';

import createIndexFile from '../actions/create-index-file';
import createOrUpdateTsConfigFile from '../actions/create-or-update-tsconfig-file';
import createSampleResourceElement from '../actions/create-sample-resource-element';
import initNodeProjectAction from '../actions/init-node-project';
import installRequiredDependencies from '../actions/install-required-dependencies';
import wait, { DEFAULT_WAIT_TIME } from '../helpers/wait.helper';

const initCommand = new Command('init');

initCommand
    .description('Initialize a new Zotto project with the required settings')
    .option('-y, --yes', 'Accept all prompts')
    .option('-F, --fast', 'Execute the command without waiting')
    .option('-N, --no-sample', 'Initialize the project without creating a sample resource element')
    .action(async flags => {
        console.clear();
        console.log('Init Zotto Project...');

        if (flags.yes) {
            console.log('Running in yes to all mode...');
            if (!flags.fast) {
                await wait(DEFAULT_WAIT_TIME);
            }
        }

        await initNodeProjectAction({ yes: flags.yes, fast: flags.fast });

        await installRequiredDependencies({ yes: flags.yes, fast: flags.fast });

        await createOrUpdateTsConfigFile({ yes: flags.yes, fast: flags.fast });

        createIndexFile();

        if (flags.sample) {
            createSampleResourceElement();
        }

        console.clear();
        console.log('Zotto project initialized!');
    });

export default initCommand;
