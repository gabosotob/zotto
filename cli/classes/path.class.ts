export class Path {
    static buildFilePath(fileName: string, directoryPath?: string): string {
        if (directoryPath) {
            return process.cwd() + '/' + directoryPath + '/' + fileName;
        } else {
            return process.cwd() + '/' + fileName;
        }
    }
}
