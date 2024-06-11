import { Z_SERVICE_SYMBOL } from '../constants/symbols.constants';
import { FactoryConstructable } from './helpers/factory-constructable.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Service(target: any) {
    Reflect.defineMetadata(Z_SERVICE_SYMBOL, true, target);

    return FactoryConstructable(target, 'Service must be constructed with ServiceFactory.create');
}
