#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import handlebars from 'handlebars';
import readline from 'readline';

const program = new Command();
const CURRENT_DIRECTORY = process.cwd();
const DIRECTORY = __dirname;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

program.version('0.0.1').description('A simple CLI program');

const getTemplate = (type: string): string => fs.readFileSync(`${DIRECTORY}/templates/${type}.hbs`, 'utf8');

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
const splitBySpace = (str: string) => str.split(' ');

const toClassName = (name: string, type: string) => {
    const words = splitBySpace(name);
    return words.map(capitalize).join('') + capitalize(type);
};

const toFileName = (str: string) => splitBySpace(str).join('-').toLowerCase();

program.command('new <type> [name]').action(async (type: string, name: string) => {
    // Create a new file

    const fileTemplate = getTemplate(type);

    const upperCaseName = capitalize(name);
    const className = toClassName(name, type);
    const fileName = toFileName(name);

    const template = handlebars.compile(fileTemplate);

    const filePath = `${CURRENT_DIRECTORY}/${fileName}.${type}.ts`;

    const answer = await askQuestion(
        `Adding a new ${type} file with the name "${fileName}.${type}.ts" of class "${className}".\n Do you want to proceed? (yes/no)`,
    );

    if (answer !== 'yes') {
        console.log('Operation cancelled!');

        return;
    }

    fs.writeFileSync(filePath, template({ className, name: upperCaseName }));
    console.log(`File created successfully at ${filePath}!`);
});

const askQuestion = (question: string): Promise<string> => {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
            rl.close();
        });
    });
};

program.parse(process.argv);

export * from './src';
