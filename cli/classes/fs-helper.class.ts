/* eslint-disable no-console */
import commentJson from 'comment-json';
import fs from 'fs';
import path from 'path';

import FileName from '../enums/file-name.enum';

export default class FSHelper {
    static checkFileExists(fileName: string, relativePath = process.cwd()) {
        return fs.existsSync(path.join(relativePath, fileName));
    }

    static getFile(fileName: string, relativePath = process.cwd()) {
        if (!FSHelper.checkFileExists(fileName, relativePath)) return null;

        return fs.readFileSync(path.join(relativePath, fileName), 'utf-8');
    }

    static getJsonFile(fileName: string, relativePath = process.cwd()) {
        const file = FSHelper.getFile(fileName, relativePath);

        if (!file) return null;

        return commentJson.parse(file);
    }

    static writeFile(fileName: string, data: any, relativePath = process.cwd()) {
        fs.writeFileSync(path.join(relativePath, fileName), data);
    }

    static writeJsonFile(fileName: string, data: any, relativePath = process.cwd()) {
        FSHelper.writeFile(fileName, commentJson.stringify(data, null, 2), relativePath);
    }

    static getPackageJson(relativePath = process.cwd()) {
        return FSHelper.getJsonFile(FileName.PACKAGE_JSON, relativePath);
    }
}
