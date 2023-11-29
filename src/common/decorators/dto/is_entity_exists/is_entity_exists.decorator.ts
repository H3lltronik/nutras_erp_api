import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsEntityExistConstraint } from './is_entity_exists.constraint';

export function IsEntityExist(
  entity: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: IsEntityExistConstraint,
    });
  };
}
