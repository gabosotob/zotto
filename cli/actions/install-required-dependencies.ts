/* eslint-disable no-console */
import FsHelper from '../classes/fs-helper.class';
import Operation from '../classes/operation.class';
import packageManager from '../classes/package-manager.class';
import { REQUIRED_DEPENDENCIES, REQUIRED_DEV_DEPENDENCIES } from '../constants/required-dependencies.constants';
import { CommandFlags } from '../types/command-flag.type';
import { isEmpty, length } from '../utils/conditionals.util';



function getMissingDependencies() {
    const packageJson = FsHelper.getPackageJson() as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
    };

    const missingDependencies = REQUIRED_DEPENDENCIES.filter(dependency => !packageJson?.dependencies?.[dependency]);
    const missingDevDependencies = REQUIRED_DEV_DEPENDENCIES.filter(
        dependency => !packageJson?.devDependencies?.[dependency],
    );

    return { missingDependencies, missingDevDependencies };
}

function installMissingDependencies(missingDependencies: string[], missingDevDependencies: string[]) {
    console.clear();
    console.log('Installing missing dependencies...');

    if (!isEmpty(missingDependencies)) {
        packageManager.installDependencies(missingDependencies);
    }

    if (!isEmpty(missingDevDependencies)) {
        packageManager.installDevDependencies(missingDevDependencies);
    }

    console.log('Dependencies installed successfully!');
}

export default async function installRequiredDependencies({ yes }: CommandFlags) {
    const { missingDependencies, missingDevDependencies } = getMissingDependencies();
    const hasMissingDependencies = !isEmpty(missingDependencies) || !isEmpty(missingDevDependencies);

    if (hasMissingDependencies) {
        await Operation.confirm(
            `Missing dependencies: ${missingDependencies} ${missingDevDependencies} ${length(missingDevDependencies) > 1 ? 'dev dependencies' : 'dev dependency'}, do you want to install them? (yes/no)`,
            () => installMissingDependencies(missingDependencies, missingDevDependencies),
            yes,
        );
    }
}
