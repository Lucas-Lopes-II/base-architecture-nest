import { UserOutputMapper } from './../../user-output';
import { UserEntity } from './../../../../domain/entities';
import { UserDataBuilder } from '../../../../domain/entities/testing/helpers/user-data-builder';

describe('UserOutputMapper unit tests', () => {
  it('should convert a user in output', () => {
    const entity = new UserEntity(UserDataBuilder({}));
    const spyToJson = jest.spyOn(entity, 'toJSON');
    const sut = UserOutputMapper.toOutput(entity);

    expect(spyToJson).toHaveBeenCalled();
    expect(sut).toStrictEqual(entity.toJSON());
  });
});
