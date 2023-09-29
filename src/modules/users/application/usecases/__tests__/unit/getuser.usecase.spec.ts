import { GetUserUseCase } from '../../getuser.usecase';
import { UserEntity } from './../../../../domain/entities';
import { NotFoundError } from './../../../../../../shared/domain/errors';
import { UserInMemoryRepository } from './../../../../infrastructure/database/repositories';
import { UserDataBuilder } from '../../../../domain/entities/testing/helpers/user-data-builder';

describe('GetUserUseCase unit tests', () => {
  let getUserUseCase: GetUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    getUserUseCase = new GetUserUseCase.UseCase(repository);
  });

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      getUserUseCase.execute({ id: 'fakeId' }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should be able to get user profile', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    const result = await getUserUseCase.execute({ id: items[0]._id });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      id: items[0].id,
      name: items[0].name,
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    });
  });
});
