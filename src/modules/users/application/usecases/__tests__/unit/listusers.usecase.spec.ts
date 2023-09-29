import { ListUsersUseCase } from '../../listusers.usecase';
import { UserEntity } from './../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { UserInMemoryRepository } from './../../../../infrastructure/database/repositories';
import { UserDataBuilder } from '../../../../domain/entities/testing/helpers/user-data-builder';

describe('ListUsersUseCase unit tests', () => {
  let listUsersUseCase: ListUsersUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    listUsersUseCase = new ListUsersUseCase.UseCase(repository);
  });

  it('toOutput method', () => {
    let result = new UserRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });
    let output = listUsersUseCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });

    const entity = new UserEntity(UserDataBuilder({}));
    result = new UserRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });
    output = listUsersUseCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
  });
});
