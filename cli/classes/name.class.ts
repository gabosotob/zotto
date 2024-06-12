export default class Name {
    constructor(public name: string) {}

    static capitalize(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    toPascalCase(word?: string) {
        if (word) return word.split(' ').map(Name.capitalize).join('');

        return this.name.split(' ').map(Name.capitalize).join('');
    }

    toKebabCase() {
        return this.name.split(' ').join('-').toLowerCase();
    }

    toClass(type: string) {
        return this.toPascalCase() + this.toPascalCase(type);
    }
}
