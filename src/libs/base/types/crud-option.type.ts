export type AggregateCrudOptions = {
  createDto?: { new (): NonNullable<unknown> };
  updateDto?: { new (): NonNullable<unknown> };
};

export type EntityCrudOptions = {
  aggregateIdName: string;
  createDto?: { new (): NonNullable<unknown> };
  updateDto?: { new (): NonNullable<unknown> };
};

export interface ObjectCrudOptions {
  firstAggregateIdName: string;
  firstInclude: string;
  secondAggregateIdName: string;
  secondInclude: string;
  assignFirstDto?: { new (): NonNullable<unknown> };
  assignSecondDto?: { new (): NonNullable<unknown> };
}
