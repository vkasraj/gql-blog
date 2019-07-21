export function deleteProps(target: object, props: string[]): any {
    props.forEach(prop => {
        Reflect.deleteProperty(target, prop);
    });

    return target;
}
