import commentJson from 'comment-json';
import fs from 'fs';
import path from 'path';

import Question from '../classes/question.class';

const TS_CONFIG_FILE_PATH = path.join(process.cwd(), 'tsconfig.json');

function readTsConfigFile() {
    if (!fs.existsSync(TS_CONFIG_FILE_PATH)) {
        console.log('tsconfig.json file not found!');
        return null;
    }

    return commentJson.parse(fs.readFileSync(TS_CONFIG_FILE_PATH, 'utf-8'));
}

function writeTsConfigFile(config: any) {
    fs.writeFileSync(TS_CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
    console.log('tsconfig.json created successfully!');
}

const hasRequiredSettings = (config: any) =>
    config.compilerOptions.experimentalDecorators && config.compilerOptions.emitDecoratorMetadata;

export default async function createOrUpdateTsConfig() {
    const requiredConfig = {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
    };

    const completeConfig = {
        compilerOptions: {
            target: 'es2016',
            ...requiredConfig,
            module: 'commonjs',
            esModuleInterop: true,
            forceConsistentCasingInFileNames: true,
            strict: true,
            skipLibCheck: true,
        },
    };

    const filePath = path.join(process.cwd(), 'tsconfig.json');

    const existingConfig: any = readTsConfigFile();

    if (!existingConfig) {
        const question = new Question('tsconfig.json file not found, do you want to create it? (yes/no)');

        await question.ask();

        if (!question.didAccept()) {
            console.log('Operation cancelled!');
            return;
        }

        writeTsConfigFile(completeConfig);
        return;
    }

    if (hasRequiredSettings(existingConfig)) {
        console.log('tsconfig.json already has the required settings!');
        return;
    }

    existingConfig.compilerOptions.experimentalDecorators = requiredConfig.experimentalDecorators;
    existingConfig.compilerOptions.emitDecoratorMetadata = requiredConfig.emitDecoratorMetadata;

    const question = new Question(
        "tsconfig.json doesn't have the required settings, these settings are required for Zotto to work properly, do you want to update the file? (yes/no)",
    );

    await question.ask();

    if (!question.didAccept()) {
        console.log('Operation cancelled!');
        return;
    }

    console.log('Updating tsconfig.json...');

    fs.writeFileSync(filePath, commentJson.stringify(existingConfig, null, 2));
    console.log('tsconfig.json updated successfully!');
}
