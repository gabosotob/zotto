import Question from './question.class';

export default class Operation {
    constructor(
        private question: Question,
        private operation: (...args: any[]) => any,
    ) {}

    confirm() {
        return this.question.ask(async didAccept => {
            if (didAccept) {
                await this.operation();
            } else {
                // eslint-disable-next-line no-console
                console.log('Operation cancelled!');
            }
        });
    }

    static async confirm(question: string, operation: (...args: any[]) => any, confirmed: boolean = false) {
        const questionInstance = new Question(question);

        if (confirmed) {
            await operation();
            return questionInstance;
        }

        return questionInstance.ask(async didAccept => {
            if (didAccept) await operation();
            // eslint-disable-next-line no-console
            else console.log('Operation cancelled!');
        });
    }
}
