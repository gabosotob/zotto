import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import path from 'path';

export class Template {
    static getTemplateDelegate(type: string): handlebars.TemplateDelegate {
        const templatePath = path.resolve(__dirname, `../templates/${type}.hbs`);
        let file;
        try {
            file = readFileSync(templatePath, 'utf-8');
        } catch (error) {
            throw new Error(`Template file "${type}" not found!`);
        }

        return handlebars.compile(file);
    }

    private template: handlebars.TemplateDelegate;

    constructor(private type: string) {
        this.template = Template.getTemplateDelegate(this.type);
    }

    render(data: unknown): string {
        return this.template(data);
    }
}
