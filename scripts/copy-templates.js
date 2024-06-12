import { copyFileSync, existsSync, mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'fs';
import path, { join } from 'path';

function deleteDirectory(dir) {
    readdirSync(dir).forEach(file => {
        const filePath = join(dir, file);
        const fileStat = statSync(filePath);

        if (fileStat.isDirectory()) {
            deleteDirectory(filePath);
        } else {
            unlinkSync(filePath);
        }
    });

    rmdirSync(dir);
}

function copyFilesRecursive(sourceDir, targetDir) {
    readdirSync(sourceDir).forEach(file => {
        const sourcePath = join(sourceDir, file);
        const targetPath = join(targetDir, file);

        const fileStat = statSync(sourcePath);

        if (fileStat.isDirectory()) {
            copyFilesRecursive(sourcePath, targetPath);
        } else {
            copyFileSync(sourcePath, targetPath);
        }
    });
}

function copyFiles(sourceDir, targetDir) {
    if (existsSync(targetDir)) {
        console.log('Deleting existing target directory...');
        deleteDirectory(targetDir);
    }

    console.log('Creating target directory...');
    mkdirSync(targetDir);

    console.log(`Copying files from ${sourceDir} to ${targetDir}`);
    copyFilesRecursive(sourceDir, targetDir);

    console.log('Files copied successfully!');
}

const sourceDir = path.resolve(__dirname, '../cli/templates');
const targetDir = path.resolve(__dirname, '../dist/cli/templates');

try {
    console.log('Copying files...');
    copyFiles(sourceDir, targetDir);
} catch (error) {
    console.error('Error copying files:', error);
}
