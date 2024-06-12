import { ClassType } from '../types';
import BoundMethod from './bound-method.decorator';

export default function BoundClass() {
    return (target: ClassType) => {
        const keys = Object.getOwnPropertyNames(target.prototype);

        keys.forEach(key => {
            const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

            if (!descriptor?.value || typeof descriptor.value !== 'function' || key === 'constructor') return;

            Object.defineProperty(target.prototype, key, BoundMethod()(target.prototype, key, descriptor));
        });

        return target;
    };
}
