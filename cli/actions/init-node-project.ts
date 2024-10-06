import ExecModule from '../classes/exec-module.class';
import FsHelper from '../classes/fs-helper.class';
import Operation from '../classes/operation.class';
import { CommandFlags } from '../types/command-flag.type';

function initNodeProject() {
    console.clear();
    console.log('Creating a new Node.js project...');

    ExecModule.runSync('npm init -y');

    console.log('Node.js project created successfully!');
}

function hasNodeProject() {
    return FsHelper.checkFileExists('package.json');
}

export default async function initNodeProjectAction({ yes }: CommandFlags) {
    if (hasNodeProject()) {
        return;
    }

    await Operation.confirm('Do you want to create a new Node.js project? (yes/no)', initNodeProject, yes);
}
