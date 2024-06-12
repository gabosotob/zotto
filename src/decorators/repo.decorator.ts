import MetadataUtils from '../utils/metadata.utils';
import Injectable from './injectable.decorator';

/**
 *
 * @returns A class decorator that sets the metadata that indicates that the class is a repository.
 */
export default function Repo() {
    return (target: any) => {
        MetadataUtils.setAsZRepo(target);

        return Injectable()(target);
    };
}
