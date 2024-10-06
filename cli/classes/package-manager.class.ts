import { PackageManagerEnum, PackageManagerLockFile } from '../enums/package-manager.enum';
import { PackageManagerInfo } from '../types/package-manager-info.type';
import ExecModule from './exec-module.class';
import FsHelper from './fs-helper.class';

/* eslint-disable no-console */
export class PackageManager {
    private readonly DEFAULT_PACKAGE_MANAGER = PackageManagerEnum.NPM;

    private readonly PACKAGE_MANAGERS_INFO: PackageManagerInfo[] = [
        {
            name: PackageManagerEnum.NPM,
            lockFile: PackageManagerLockFile.PACKAGE_LOCK_JSON,
            installCommand: `${PackageManagerEnum.NPM} install`,
        },
        {
            name: PackageManagerEnum.YARN,
            lockFile: PackageManagerLockFile.YARN_LOCK,
            installCommand: `${PackageManagerEnum.YARN} install`,
        },
        {
            name: PackageManagerEnum.PNPM,
            lockFile: PackageManagerLockFile.PNPM_LOCK_YAML,
            installCommand: `${PackageManagerEnum.PNPM} install`,
        },
    ];

    private packageManager?: string;

    constructor() {
        this.resolvePackageManager();
    }

    private resolvePackageManager() {
        const packageManager = this.PACKAGE_MANAGERS_INFO.find(({ lockFile }) => FsHelper.checkFileExists(lockFile));

        this.packageManager = packageManager?.name ?? this.DEFAULT_PACKAGE_MANAGER;
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
        const packageJson: any = FsHelper.getPackageJson();

        return packageJson?.dependencies?.[packageName] || packageJson?.devDependencies?.[packageName];
    }
}

const packageManager = new PackageManager();

export default packageManager;
