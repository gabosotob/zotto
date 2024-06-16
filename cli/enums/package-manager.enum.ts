import FileName from './file-name.enum';

export enum PackageManagerEnum {
    NPM = 'npm',
    YARN = 'yarn',
    PNPM = 'pnpm',
}

export enum PackageManagerLockFile {
    PACKAGE_LOCK_JSON = FileName.PACKAGE_LOCK_JSON,
    YARN_LOCK = FileName.YARN_LOCK,
    PNPM_LOCK_YAML = FileName.PNPM_LOCK_YAML,
}
