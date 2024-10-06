import { ClassType } from '../types/class.type';
import MetadataUtils from '../utils/metadata.utils';
import { toPath } from '../utils/path.utils';
import BoundClass from './bound-class.decorator';

/**
 * Creates a resource decorator that sets the base path for a class.
 *
 * @param name The name of the resource that is used as the base path, e.g. '/users' or '/posts', or just a name, e.g. 'users' or 'posts' (will be converted to '/users' and '/posts' respectively).
 * @returns A decorator function that sets the base path metadata for the class.
 */
export default function Resource(name: string) {
    return <T extends ClassType>(target: T) => {
        MetadataUtils.setBasePath(target, toPath(name));
        MetadataUtils.setAsZResource(target);

        return BoundClass()(target);
    };
}
