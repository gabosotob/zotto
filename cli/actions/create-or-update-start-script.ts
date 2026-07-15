/* eslint-disable no-console */
import FsHelper from '../classes/fs-helper.class';
import FileName from '../enums/file-name.enum';

const START_SCRIPT = "nodemon --watch './**/*.ts' --exec ts-node index.ts";

export default function createOrUpdateStartScript() {
    const packageJson = FsHelper.getPackageJson() as { scripts?: Record<string, string> } | null;

    if (!packageJson || packageJson.scripts?.start) return;

    console.log('Adding start script to package.json...');

    packageJson.scripts = { ...packageJson.scripts, start: START_SCRIPT };

    FsHelper.writeJsonFile(FileName.PACKAGE_JSON, packageJson);

    console.log('Start script added successfully!');
}
