import { faker } from '@faker-js/faker';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let userEntity: UserEntity;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    userEntity = new UserEntity(props);
  });

  it('Constructor method', () => {
    expect(userEntity.props.name).toEqual(props.name);
    expect(userEntity.props.email).toEqual(props.email);
    expect(userEntity.props.password).toEqual(props.password);
    expect(userEntity.props.createdAt).toBeInstanceOf(Date);
  });
});
