/* eslint-disable no-console */
import ExecModule from '../classes/exec-module.class';
import FsHelper from '../classes/fs-helper.class';
import Operation from '../classes/operation.class';
import FileName from '../enums/file-name.enum';
import { CommandFlags } from '../types/command-flag.type';
import { isNil, isObject } from '../utils/conditionals.util';

function initTypescript() {
    console.clear();
    console.log('Creating tsconfig.json...');

    ExecModule.runSync('npx tsc --init');

    console.log('tsconfig.json created successfully!');
}

function createTsConfigFile() {
    if (!FsHelper.checkFileExists(FileName.TS_CONFIG_JSON)) {
        console.log('tsconfig.json not found! creating a new one...');
        initTypescript();
        return true;
    }
    return false;
}

type TsConfig = {
    compilerOptions: {
        experimentalDecorators?: boolean;
        emitDecoratorMetadata?: boolean;
        module?: string;
        esModuleInterop?: boolean;
        verbatimModuleSyntax?: boolean;
    };
};

const isTsConfig = (config: any): config is TsConfig => isObject(config) && !isNil(config.compilerOptions);

const hasRequiredSettings = (config: Partial<TsConfig>): boolean =>
    !!config.compilerOptions?.emitDecoratorMetadata &&
    !!config.compilerOptions?.experimentalDecorators &&
    config.compilerOptions?.module?.toLowerCase() === 'commonjs' &&
    !!config.compilerOptions?.esModuleInterop &&
    !config.compilerOptions?.verbatimModuleSyntax;

async function updateTsConfigFile(config: any, options?: { noComments?: boolean }) {
    console.clear();
    console.log('Updating tsconfig.json...');

    FsHelper.writeJsonFile('tsconfig.json', config, options);

    console.log('tsconfig.json updated successfully!');
}

export default async function createOrUpdateTsConfigFile({ yes }: CommandFlags) {
    const fileWasGenerated = createTsConfigFile();
    const existingConfig = FsHelper.getJsonFile('tsconfig.json');

    if (!isTsConfig(existingConfig) || hasRequiredSettings(existingConfig)) {
        return;
    }

    existingConfig.compilerOptions.experimentalDecorators = true;
    existingConfig.compilerOptions.emitDecoratorMetadata = true;
    existingConfig.compilerOptions.module = 'commonjs';
    existingConfig.compilerOptions.esModuleInterop = true;
    delete existingConfig.compilerOptions.verbatimModuleSyntax;

    if (fileWasGenerated) {
        updateTsConfigFile(existingConfig, { noComments: true });
    } else {
        await Operation.confirm(
            "tsconfig.json doesn't have the required settings, these settings are required for Zotto to work properly, do you want to update the file? (yes/no)",
            () => updateTsConfigFile(existingConfig),
            yes,
        );
    }
}
