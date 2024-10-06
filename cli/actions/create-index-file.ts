import FsHelper from '../classes/fs-helper.class';
import Template from '../classes/templates.class';

export default function createIndexFile() {
    FsHelper.writeFile(`index.ts`, new Template('index').render({}));
}
