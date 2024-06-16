import fs from 'fs';

import Name from '../classes/name.class';
import Path from '../classes/path.class';
import Question from '../classes/question.class';
import Template from '../classes/templates.class';
import updateTsConfig from './updateTsConfig';

export default function createNewElementCommandAction(elementType: string) {
    return async (name: string, options: { explained: boolean }) => {
        await updateTsConfig();

        const { explained } = options;
        const template = new Template(elementType, explained);
        const n = new Name(name);

        const className = n.toClass(elementType);
        const kebabCasesName = n.toKebabCase();
        const fileName = `${kebabCasesName}.${elementType}.ts`;
        const filePath = Path.buildFilePath(fileName);

        const question = await new Question(
            `Adding a new ${elementType} file with the name "${fileName}" of class "${className}".\n Do you want to proceed? (yes/no)`,
        ).ask();

        if (question.didDecline()) {
            console.log('Operation cancelled!');

            return;
        }

        fs.writeFileSync(filePath, template.render({ className, path: kebabCasesName }));
        console.log(`File created successfully at ${filePath}!`);
    };
}
