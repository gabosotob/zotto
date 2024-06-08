import fs from 'fs';

import { Name } from '../classes/name.class';
import { Path } from '../classes/path.class';
import { Question } from '../classes/question.class';
import { Template } from '../classes/templates.class';
import { Command } from './command.interface';

export const newElementCommand: Command = {
    name: 'new <type> [name]',
    description: 'Create a new element',
    getCommand() {
        return async (name: string, type: string) => {
            const template = new Template(type);
            const n = new Name(name);

            const className = n.toClass(type);
            const kebabCasesName = n.toKebabCase();
            const fileName = `${kebabCasesName}.${type}.ts`;
            const filePath = Path.buildFilePath(fileName);

            const question = await new Question(
                `Adding a new ${type} file with the name "${fileName}" of class "${className}".\n Do you want to proceed? (yes/no)`,
            ).ask();

            if (question.didDecline()) {
                console.log('Operation cancelled!');

                return;
            }

            fs.writeFileSync(filePath, template.render({ className, path: kebabCasesName }));
            console.log(`File created successfully at ${filePath}!`);
        };
    },
};
