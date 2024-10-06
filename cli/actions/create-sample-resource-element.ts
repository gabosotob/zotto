import ExecModule from '../classes/exec-module.class';
import FsHelper from '../classes/fs-helper.class';

export default function createSampleResourceElement() {
    ExecModule.runSync('zotto new:resource sample');

    const file = FsHelper.getFile('index.ts');

    if (file) {
        // Add a new import statement at the beginning of the file after all imports
        const newImport = `import sampleResource from './sample.resource';\n`;

        // Add a new line after the last import statement
        const newFile = file.replace(/import.*\n/, `$&${newImport}`);

        // add "app.use(sampleResource.getRouter());" before the app.listen() statement
        const newFileWithRouter = newFile.replace(/app\.listen\([^]*\);/, `app.use(sampleResource.getRouter());\n\n$&`);

        FsHelper.writeFile('index.ts', newFileWithRouter);
    }
}
