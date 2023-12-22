import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEntityExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async validate(uuid: any, args: ValidationArguments) {
    const [entity] = args.constraints;
    const tableName = entity.name.toLowerCase();
    const count = await this.entityManager
      .getRepository(entity)
      .count({ where: { id: uuid } });
    return count > 0;
  }

  defaultMessage(args: ValidationArguments) {
    const [entity] = args.constraints;
    return `${entity.name} with ID ${args.value} does not exist`;
  }
}
