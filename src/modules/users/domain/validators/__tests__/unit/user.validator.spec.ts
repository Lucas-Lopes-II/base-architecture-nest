import { UserProps } from './../../../entities/user.entity';
import { UserDataBuilder } from '../../../entities/testing/helpers/user-data-builder';
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator';

let userValidator: UserValidator;
let props: UserProps;

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    userValidator = UserValidatorFactory.create();
    props = UserDataBuilder({});
  });

  it('Invalidation cases for name field', () => {
    let isValid = userValidator.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ]);

    isValid = userValidator.validate({ ...props, name: '' });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['name']).toStrictEqual([
      'name should not be empty',
    ]);

    isValid = userValidator.validate({ ...props, name: 10 as any });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ]);

    isValid = userValidator.validate({ ...props, name: 'a'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
    ]);
  });

  it('Valid case for user rules', () => {
    const isValid = userValidator.validate(props);
    expect(isValid).toBeTruthy();
    expect(userValidator.validatedData).toStrictEqual(new UserRules(props));
  });
});
