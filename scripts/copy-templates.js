import { copyFileSync, existsSync, mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'fs';
import path, { join } from 'path';

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

function copyFilesRecursive(sourceDir, targetDir) {
    for (const file of readdirSync(sourceDir)) {
        const sourcePath = join(sourceDir, file);
        const targetPath = join(targetDir, file);

        const fileStat = statSync(sourcePath);

        fileStat.isDirectory() ? copyFilesRecursive(sourcePath, targetPath) : copyFileSync(sourcePath, targetPath);
    }
}

function deleteDirectory(dir) {
    for (const file of readdirSync(dir)) {
        const filePath = join(dir, file);
        const fileStat = statSync(filePath);

        fileStat.isDirectory() ? deleteDirectory(filePath) : unlinkSync(filePath);
    }

    rmdirSync(dir);
}

const sourceDir = path.resolve(__dirname, '../cli/templates');
const targetDir = path.resolve(__dirname, '../dist/cli/templates');

try {
    console.log('Copying files...');
    copyFiles(sourceDir, targetDir);
} catch (error) {
    console.error('Error copying files:', error);
}
