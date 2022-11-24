declare module 'modelair' {
    export function initModel(schema): object
    export function initMissing(schema, target): object
    export function validate(schema, value): object
}
