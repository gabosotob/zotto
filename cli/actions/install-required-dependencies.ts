/* eslint-disable no-console */
import FsHelper from '../classes/fs-helper.class';
import Operation from '../classes/operation.class';
import packageManager from '../classes/package-manager.class';
import { REQUIRED_DEPENDENCIES, REQUIRED_DEV_DEPENDENCIES } from '../constants/required-dependencies.constants';
import { CommandFlags } from '../types/command-flag.type';
import { isEmpty, length } from '../utils/conditionals.util';



function parsePackageSpec(spec: string): { name: string; version?: string } {
    const atIndex = spec.startsWith('@') ? spec.indexOf('@', 1) : spec.indexOf('@');

    if (atIndex === -1) return { name: spec };

    return { name: spec.slice(0, atIndex), version: spec.slice(atIndex + 1) };
}

function getMissingOrOutdatedDependencies(specs: string[], installed?: Record<string, string>) {
    return specs.filter(spec => {
        const { name, version } = parsePackageSpec(spec);
        const installedVersion = installed?.[name];

        if (!installedVersion) return true;

        // Force pinned dependencies back to the required version if they drifted (e.g. manually bumped).
        return !!version && installedVersion !== version;
    });
}

function getMissingDependencies() {
    const packageJson = FsHelper.getPackageJson() as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
    };

    const missingDependencies = getMissingOrOutdatedDependencies(REQUIRED_DEPENDENCIES, packageJson?.dependencies);
    const missingDevDependencies = getMissingOrOutdatedDependencies(
        REQUIRED_DEV_DEPENDENCIES,
        packageJson?.devDependencies,
    );

    return { missingDependencies, missingDevDependencies };
}

function installMissingDependencies(missingDependencies: string[], missingDevDependencies: string[]) {
    console.clear();
    console.log('Installing missing or outdated dependencies...');

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
            `Missing or outdated dependencies: ${missingDependencies} ${missingDevDependencies} ${length(missingDevDependencies) > 1 ? 'dev dependencies' : 'dev dependency'}, do you want to install them? (yes/no)`,
            () => installMissingDependencies(missingDependencies, missingDevDependencies),
            yes,
        );
    }
}
