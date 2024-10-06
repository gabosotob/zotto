import FsHelper from '../classes/fs-helper.class';
import Name from '../classes/name.class';
import Template from '../classes/templates.class';
import ElementType from '../enums/element-type.enum';

export default function createNewElement(name: string, type: ElementType, options: { explained: boolean }) {
    const n = new Name(name);

    const kebabCasesName = n.toKebabCase();

    FsHelper.writeFile(
        `${kebabCasesName}.${type}.ts`,
        new Template(type, options.explained).render({
            className: n.toClass(type),
            path: kebabCasesName,
        }),
    );
}
