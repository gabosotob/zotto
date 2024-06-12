import { ClassType } from '../types';
import MetadataUtils from '../utils/metadata.utils';

/**
 *
 * @returns A class decorator that sets the metadata that indicates that the class is an injectable dependency.
 */
export default function Injectable() {
    return (target: ClassType) => {
        MetadataUtils.setAsInjectable(target);

        return target;
    };
}
