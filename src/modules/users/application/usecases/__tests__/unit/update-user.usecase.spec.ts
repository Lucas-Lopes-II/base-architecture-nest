import {
  BadRequestError,
  NotFoundError,
} from './../../../../../../shared/domain/errors';
import { UpdateUserUseCase } from '../../update-user.usecase';
import { UserEntity } from './../../../../domain/entities/user.entity';
import { UserDataBuilder } from '../../../../domain/entities/testing/helpers/user-data-builder';
import { UserInMemoryRepository } from './../../../../infrastructure/database/repositories';

describe('UpdateUserUseCase unit tests', () => {
  let updateUserUseCase: UpdateUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    updateUserUseCase = new UpdateUserUseCase.UseCase(repository);
  });

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      updateUserUseCase.execute({
        id: 'fakeId',
        name: 'test name',
        email: 'teste email',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should throws error when name or email is not provided', async () => {
    await expect(() =>
      updateUserUseCase.execute({
        id: 'fakeId',
        name: '',
        email: '',
      }),
    ).rejects.toThrow(new BadRequestError('Data not provided'));
  });

  it('Should update a user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    const result = await updateUserUseCase.execute({
      id: items[0]._id,
      name: 'new name',
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      id: items[0].id,
      name: 'new name',
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    });
  });
});
