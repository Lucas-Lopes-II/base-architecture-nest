import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '../../testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let userEntity: UserEntity;

  beforeEach(() => {
    props = props = UserDataBuilder({});
    userEntity = new UserEntity(props);
  });

  it('Constructor method', () => {
    expect(userEntity.props.name).toEqual(props.name);
    expect(userEntity.props.email).toEqual(props.email);
    expect(userEntity.props.password).toEqual(props.password);
    expect(userEntity.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getter of name field', () => {
    expect(userEntity.name).toBeDefined();
    expect(userEntity.name).toEqual(props.name);
    expect(typeof userEntity.name).toBe('string');
  });

  it('Getter of email field', () => {
    expect(userEntity.email).toBeDefined();
    expect(userEntity.email).toEqual(props.email);
    expect(typeof userEntity.email).toBe('string');
  });

  it('Getter of password field', () => {
    expect(userEntity.password).toBeDefined();
    expect(userEntity.password).toEqual(props.password);
    expect(typeof userEntity.password).toBe('string');
  });

  it('Getter of password field', () => {
    expect(userEntity.createdAt).toBeDefined();
    expect(userEntity.createdAt).toBeInstanceOf(Date);
  });
});
