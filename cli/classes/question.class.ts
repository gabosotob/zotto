import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export default class Question {
    private answer?: string;

    constructor(public question: string) {}

    async ask(): Promise<Question> {
        await new Promise(resolve => {
            rl.question(`${this.question} `, answer => {
                this.answer = answer;
                resolve(answer);
            });
        });

        return this;
    }

    didAccept(): boolean | null {
        return this.answer ? this.answer.toLowerCase() === 'yes' || this.answer.trim() === '' : null;
    }

    didDecline(): boolean | null {
        return this.answer ? this.answer.toLowerCase() === 'no' : null;
    }
}
