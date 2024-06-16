import { PackageManagerEnum, PackageManagerLockFile } from '../enums/package-manager.enum';

export type PackageManagerInfo = {
    name: PackageManagerEnum;
    lockFile: PackageManagerLockFile;
    installCommand: string;
};
