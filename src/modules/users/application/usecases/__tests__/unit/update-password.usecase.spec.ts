import {
  InvalidPasswordError,
  NotFoundError,
} from './../../../../../../shared/domain/errors';
import {
  Bcrypt,
  ICryptography,
} from './../../../../../../shared/aplication/providers';
import { UpdatePasswordUseCase } from '../../update-password.usecase';
import { UserEntity } from './../../../../domain/entities/user.entity';
import { UserInMemoryRepository } from './../../../../infrastructure/database/repositories';
import { UserDataBuilder } from '../../../../domain/entities/testing/helpers/user-data-builder';

describe('UpdatePasswordUseCase unit tests', () => {
  let updatePasswordUseCase: UpdatePasswordUseCase.UseCase;
  let repository: UserInMemoryRepository;
  let cryptography: ICryptography;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    cryptography = new Bcrypt();
    updatePasswordUseCase = new UpdatePasswordUseCase.UseCase(
      repository,
      cryptography,
    );
  });

  it('Should throws error when entity not found', async () => {
    await expect(() =>
      updatePasswordUseCase.execute({
        id: 'fakeId',
        password: 'test password',
        oldPassword: 'old password',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('Should throws error when old password not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    repository.items = [entity];
    await expect(() =>
      updatePasswordUseCase.execute({
        id: entity._id,
        password: 'test password',
        oldPassword: '',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password is required'),
    );
  });

  it('Should throws error when new password not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({ password: '1234' }));
    repository.items = [entity];
    await expect(() =>
      updatePasswordUseCase.execute({
        id: entity._id,
        password: '',
        oldPassword: '1234',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password is required'),
    );
  });

  it('Should throws error when new old password does not match', async () => {
    const hashPassword = await cryptography.hash('1234');
    const entity = new UserEntity(UserDataBuilder({ password: hashPassword }));
    repository.items = [entity];
    await expect(() =>
      updatePasswordUseCase.execute({
        id: entity._id,
        password: '4567',
        oldPassword: '123456',
      }),
    ).rejects.toThrow(new InvalidPasswordError('Old password does not match'));
  });

  it('Should update a password', async () => {
    const hashPassword = await cryptography.hash('1234');
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new UserEntity(UserDataBuilder({ password: hashPassword }))];
    repository.items = items;

    const result = await updatePasswordUseCase.execute({
      id: items[0]._id,
      password: '4567',
      oldPassword: '1234',
    });

    const checkNewPassword = await cryptography.compare(
      '4567',
      result.password,
    );
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(checkNewPassword).toBeTruthy();
  });
});
