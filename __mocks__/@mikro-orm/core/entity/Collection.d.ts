export declare class Collection<T, O = unknown> {
    getItems(check?: boolean): T[];
    set(items: (T | Reference<T>)[]): void;
}
