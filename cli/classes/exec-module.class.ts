import { execSync } from 'child_process';
import { log } from 'console';

export default class ExecModule {
    static runSync(command: string) {
        log(`Executing command: ${command}`);
        return execSync(command, { encoding: 'utf-8' });
    }
}
