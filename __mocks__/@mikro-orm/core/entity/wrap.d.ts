export declare function wrap<T, PK extends keyof T | unknown = PrimaryProperty<T>>(entity: T, preferHelper?: false): IWrappedEntity<T, PK>;