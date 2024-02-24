import { SetMetadata } from '@nestjs/common';
import {
  AggregateCrudOptions,
  EntityCrudOptions,
} from '../types/crud-option.type';

export const AggregateCrudDecorator = (options: AggregateCrudOptions) => {
  return Reflect.metadata('crudOptions', options);
};
export const EntityCrudDecorator = (options: EntityCrudOptions) => {
  return SetMetadata('crudOptions', options);
};
