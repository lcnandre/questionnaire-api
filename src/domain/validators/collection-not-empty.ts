import { Collection } from '@mikro-orm/core';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function CollectionNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'collectionNotEmpty',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: Collection<any>) {
          return value && value.count() > 0;
        },
      },
    });
  }
}
