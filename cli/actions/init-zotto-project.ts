import ExecModule from '../classes/exec-module.class';
import FSHelper from '../classes/fs-helper.class';
import Operation from '../classes/operation.class';
import packageManager from '../classes/package-manager.class';
import wait, { DEFAULT_WAIT_TIME } from '../helpers/wait.helper';
import updateTsConfig from './updateTsConfig';

/* eslint-disable no-console */
const REQUIRED_DEPENDENCIES = ['express', 'typescript', 'zotto'];
const REQUIRED_DEV_DEPENDENCIES = ['@types/node', '@types/express', 'ts-node', 'nodemon'];

function initNodeProject() {
    console.clear();
    console.log('Creating a new Node.js project...');

    ExecModule.runSync('npm init -y');

    console.log('Node.js project created successfully!');
}

function checkRequiredDependencies() {
    const { dependencies, devDependencies }: any = FSHelper.getPackageJson();

    const missingDependencies = REQUIRED_DEPENDENCIES.filter(dependency => !dependencies?.[dependency]);
    const missingDevDependencies = REQUIRED_DEV_DEPENDENCIES.filter(dependency => !devDependencies?.[dependency]);

    return { missingDependencies, missingDevDependencies };
}

function installMissingDependencies(missingDependencies: string[], missingDevDependencies: string[]) {
    console.clear();
    console.log('Installing missing dependencies...');

    if (missingDependencies.length > 0) packageManager.installDependencies(missingDependencies);
    if (missingDevDependencies.length > 0) packageManager.installDevDependencies(missingDevDependencies);

    console.log('Dependencies installed successfully!');
}

export default async function initZottoProject({ yes: yesToAll } = { yes: false }) {
    console.clear();
    console.log('Init Zotto Project...');

    if (yesToAll) {
        console.log('Running in yes to all mode...');
        await wait(DEFAULT_WAIT_TIME);
    }

    if (!FSHelper.checkFileExists('package.json')) {
        const question = await Operation.confirm(
            'package.json not found! seems like you are not in a Node.js project.\nDo you want to create a new Node.js project? (yes/no)',
            () => initNodeProject(),
            yesToAll,
        );

        if (!yesToAll && !question.didAccept()) return;
    }

    const { missingDependencies, missingDevDependencies } = checkRequiredDependencies();

    if (missingDependencies.length > 0 || missingDevDependencies.length > 0) {
        const question = await Operation.confirm(
            `Missing dependencies: ${missingDependencies} ${missingDevDependencies} ${missingDevDependencies.length > 1 ? 'dev dependencies' : 'dev dependency'}, do you want to install them? (yes/no)`,
            () => installMissingDependencies(missingDependencies, missingDevDependencies),
            yesToAll,
        );

        if (!yesToAll && !question.didAccept()) return;
    }

    await updateTsConfig({ yes: yesToAll });

    console.clear();
    console.log('Zotto project initialized successfully!');
}
