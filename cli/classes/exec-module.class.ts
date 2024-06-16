import { execSync } from 'child_process';

export default class ExecModule {
    static runSync(command: string) {
        return execSync(command, { encoding: 'utf-8' });
    }
}
