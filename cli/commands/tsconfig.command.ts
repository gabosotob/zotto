import { Command } from 'commander';
import commentJson from 'comment-json';
import fs from 'fs';
import path from 'path';

import Question from '../classes/question.class';

const tsConfigCommand = new Command('tsconfig');

tsConfigCommand
    .description('Create or update ts-config.json file to have the required settings for Zotto.')
    .action(() => {
        const config = {
            compilerOptions: {
                target: 'es2016',
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                module: 'commonjs',
                esModuleInterop: true,
                forceConsistentCasingInFileNames: true,
                strict: true,
                skipLibCheck: true,
            },
        };

        const filePath = path.join(process.cwd(), 'tsconfig.json');

        if (fs.existsSync(filePath)) {
            // File exists, update the existing configuration
            const existingConfig: any = commentJson.parse(fs.readFileSync(filePath, 'utf-8'));
            if (!existingConfig?.compilerOptions) {
                console.log('Invalid tsconfig.json file!');
                return;
            }

            const hasRequiredSettings =
                existingConfig.compilerOptions.experimentalDecorators &&
                existingConfig.compilerOptions.emitDecoratorMetadata;

            if (hasRequiredSettings) {
                console.log('tsconfig.json already has the required settings!');
                return;
            }

            existingConfig.compilerOptions.experimentalDecorators = true;
            existingConfig.compilerOptions.emitDecoratorMetadata = true;

            const question = new Question(
                'tsconfig.json doesn`t have the required settings, these settings are required for Zotto to work properly, do you want to update the file? (yes/no)',
            );

            question.ask(accept => {
                if (!accept) {
                    console.log('Operation cancelled!');
                    return;
                }

                console.log('Updating tsconfig.json...');

                fs.writeFileSync(filePath, commentJson.stringify(existingConfig, null, 2));
                console.log('tsconfig.json updated successfully!');
            });
        } else {
            // File doesn't exist, create a new one
            fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
            console.log('tsconfig.json created successfully!');
        }
    });

export default tsConfigCommand;
