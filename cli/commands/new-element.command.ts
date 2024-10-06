/* eslint-disable no-console */
import { Command } from 'commander';

import createNewElement from '../actions/create-new-element';
import ElementType from '../enums/element-type.enum';

function createNewElementCommand(elementType: ElementType): Command {
    return new Command(`new:${elementType}`)
        .description(`Create a new ${elementType} element`)
        .argument('<name>', 'Name of the element to create')
        .option('-e, --explained', 'Add explanation comments to the generated file')
        .action(async (name: string, options: { explained: boolean }) => {
            createNewElement(name, elementType, options);

            console.log(`File created successfully!`);
        });
}

const newElementCommands = Object.values(ElementType).map(createNewElementCommand);

export default newElementCommands;
