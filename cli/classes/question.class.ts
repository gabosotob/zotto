import readline from 'readline';

export default class Question {
    private answer?: string;

    constructor(public question: string) {}

    async ask(cb?: (...args: any[]) => any): Promise<Question> {
        if (this.answer) {
            return this;
        }

        await new Promise(resolve => {
            // eslint-disable-next-line no-console
            console.clear();

            const readLine = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            readLine.question(`${this.question} `, answer => {
                this.answer = answer;
                readLine.close();

                resolve(answer);
            });
        });

        if (cb) await cb(this.didAccept(), this.didDecline(), this.answer);

        return this;
    }

    didAccept(): boolean | null {
        return this.answer ? this.answer.toLowerCase() === 'yes' || this.answer.toLowerCase() === 'y' : null;
    }

    didDecline(): boolean | null {
        return this.answer ? this.answer.toLowerCase() === 'no' || this.answer.toLowerCase() === 'n' : null;
    }
}
