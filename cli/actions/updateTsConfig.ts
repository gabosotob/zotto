/* eslint-disable no-console */
import ExecModule from '../classes/exec-module.class';
import FSHelper from '../classes/fs-helper.class';
import Operation from '../classes/operation.class';
import packageManager from '../classes/package-manager.class';
import FileName from '../enums/file-name.enum';
import wait, { DEFAULT_WAIT_TIME } from '../helpers/wait.helper';

async function updateTsConfigFile(config: any) {
    console.clear();
    console.log('Updating tsconfig.json...');

    FSHelper.writeJsonFile('tsconfig.json', config);

    console.log('tsconfig.json updated successfully!');
}

const hasRequiredSettings = (config: any) =>
    config.compilerOptions.experimentalDecorators && config.compilerOptions.emitDecoratorMetadata;

function checkTypescriptDependency() {
    try {
        ExecModule.runSync('tsc --version');
        return true;
    } catch (error) {
        return false;
    }
}

function initTypescript() {
    console.clear();
    console.log('Creating tsconfig.json...');

    ExecModule.runSync('tsc --init');

    console.log('tsconfig.json created successfully!');
}

function installTypescriptDependency() {
    console.clear();
    console.log('Installing Typescript...');

    packageManager.installDevPackage('typescript');

    console.log('Typescript installed successfully!');
}

export default async function updateTsConfig({ yes: yesToAll } = { yes: false }) {
    console.clear();
    console.log('Updating tsconfig.json...');

    if (yesToAll) {
        console.log('Running in yes to all mode...');
        await wait(DEFAULT_WAIT_TIME);
    }

    let wasFileGenerated = false;

    if (!FSHelper.checkFileExists(FileName.TS_CONFIG_JSON)) {
        const question = await Operation.confirm(
            'tsconfig.json file not found, do you want to create it? (yes/no)',
            async () => {
                if (!checkTypescriptDependency())
                    await Operation.confirm(
                        'Typescript is not installed, do you want to install it? (yes/no)',
                        installTypescriptDependency,
                        yesToAll,
                    );

                initTypescript();

                wasFileGenerated = true;
            },
            yesToAll,
        );

        if (!yesToAll && !question.didAccept()) return;
    }

    const existingConfig: any = FSHelper.getJsonFile('tsconfig.json');

    if (hasRequiredSettings(existingConfig)) {
        console.log('tsconfig.json already has the required settings!');
        return;
    }

    existingConfig.compilerOptions.experimentalDecorators = true;
    existingConfig.compilerOptions.emitDecoratorMetadata = true;

    if (wasFileGenerated) updateTsConfigFile(existingConfig);
    else
        await Operation.confirm(
            "tsconfig.json doesn't have the required settings, these settings are required for Zotto to work properly, do you want to update the file? (yes/no)",
            () => updateTsConfigFile(existingConfig),
            yesToAll,
        );
}
