import MetadataUtils from '../utils/metadata.utils';
import BoundClass from './bound-class.decorator';
import Injectable from './injectable.decorator';

/**
 *
 * @returns A class decorator that sets the metadata that indicates that the class is a service.
 */
export default function Service() {
    return (target: any) => {
        MetadataUtils.setAsZService(target);

        const BoundedClass = BoundClass()(target);

        return Injectable()(BoundedClass);
    };
}
