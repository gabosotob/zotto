import { PackageManagerEnum, PackageManagerLockFile } from '../enums/package-manager.enum';
import { PackageManagerInfo } from '../types/package-manager-info.type';

export const DEFAULT_PACKAGE_MANAGER = PackageManagerEnum.NPM;

export const PACKAGE_MANAGERS_INFO: PackageManagerInfo[] = [
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
