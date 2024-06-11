export function LogMetadata() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('target', target);
        console.log('propertyKey', propertyKey);
        console.log('descriptor', descriptor);

        const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
        console.log('🚀 ~ paramTypes:', paramTypes);
        const type = Reflect.getMetadata('design:type', target, propertyKey);
        console.log('🚀 ~ type:', type);
    };
}
