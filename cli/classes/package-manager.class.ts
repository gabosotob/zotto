import { DEFAULT_PACKAGE_MANAGER, PACKAGE_MANAGERS_INFO } from '../constants/package-managers.constants';
import ExecModule from './exec-module.class';
import FSHelper from './fs-helper.class';

/* eslint-disable no-console */
export class PackageManager {
    private packageManager?: string;

    constructor() {
        if (!this.packageManager) this.resolvePackageManager();
    }

    private resolvePackageManager() {
        const packageManager = PACKAGE_MANAGERS_INFO.find(({ lockFile }) => FSHelper.checkFileExists(lockFile));

        this.packageManager = packageManager?.name ?? DEFAULT_PACKAGE_MANAGER;
    }

    getPackageManager() {
        return this.packageManager;
    }

    setPackageManager(packageManager: string) {
        this.packageManager = packageManager;
    }

    installDependencies(dependencies: string[]) {
        console.log(`Installing ${dependencies} ${dependencies.length > 1 ? 'dependencies' : 'dependency'}...`);

        const execCommand = `${this.packageManager} install ${dependencies.join(' ')} --save`;

        console.log(`Executing: ${execCommand}`);

        ExecModule.runSync(execCommand);
    }

    installDevDependencies(devDependencies: string[]) {
        console.log(
            `Installing ${devDependencies} ${devDependencies.length > 1 ? 'dev dependencies' : 'dev dependency'}...`,
        );

        const execCommand = `${this.packageManager} install ${devDependencies.join(' ')} --save-dev`;

        console.log(`Executing: ${execCommand}`);

        ExecModule.runSync(execCommand);
    }

    installPackage(packageName: string) {
        console.log(`Installing ${packageName}...`);

        ExecModule.runSync(`${this.packageManager} install ${packageName} --save`);
    }

    installDevPackage(packageName: string) {
        console.log(`Installing ${packageName}...`);

        ExecModule.runSync(`${this.packageManager} install ${packageName} --save-dev`);
    }

    uninstallPackage(packageName: string) {
        console.log(`Uninstalling ${packageName}...`);

        ExecModule.runSync(`${this.packageManager} uninstall ${packageName}`);
    }

    // eslint-disable-next-line class-methods-use-this
    checkDependencyInstalled(packageName: string) {
        const packageJson: any = FSHelper.getPackageJson();

        return packageJson?.dependencies?.[packageName] || packageJson?.devDependencies?.[packageName];
    }
}

const packageManager = new PackageManager();

export default packageManager;
