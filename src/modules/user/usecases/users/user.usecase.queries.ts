import { CollectionQuery } from '@libs/collection-query/collection-query';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@user/persistence/users/user.entity';
import { Repository } from 'typeorm';
import { UserResponse } from './user.response';
@Injectable()
export class UserQuery {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async getUser(id: string, withDeleted = false): Promise<UserResponse> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: [],
      withDeleted: withDeleted,
    });
    if (!user) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    return UserResponse.fromEntity(user);
  }
  async getUsers(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<UserResponse>> {
    const dataQuery = QueryConstructor.constructQuery<UserEntity>(
      this.userRepository,
      query,
    );
    const d = new DataResponseFormat<UserResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => UserResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getArchivedUsers(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<UserResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<UserEntity>(
      this.userRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<UserResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => UserResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
