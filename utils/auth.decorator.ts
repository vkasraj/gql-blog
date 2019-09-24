export function authenticated() {
    console.log("g(): evaluated");
    return function(
        // @ts-ignore
        target,
        // @ts-ignore
        propertyKey: string,
        // @ts-ignore
        descriptor: PropertyDescriptor
    ) {
        console.log("g(): called");
    };
}
