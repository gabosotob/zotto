import { Command } from 'commander';

import createNewElementCommandAction from '../actions/createNewZottoElement';

function createNewElementCommand(elementType: string): Command {
    return new Command(`new:${elementType}`)
        .description(`Create a new ${elementType} element`)
        .argument('<name>', 'Name of the element to create')
        .option('-e, --explained', 'Add explanation comments to the generated file')
        .action(createNewElementCommandAction(elementType));
}

const elementTypes = ['resource'];

const newElementCommands = elementTypes.map(createNewElementCommand);

export default newElementCommands;
