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

  it('Valid case for user rules', () => {
    const isValid = userValidator.validate(props);
    expect(isValid).toBeTruthy();
    expect(userValidator.validatedData).toStrictEqual(new UserRules(props));
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

  it('Invalidation cases for email field', () => {
    let isValid = userValidator.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
      'email must be a string',
      'email must be shorter than or equal to 255 characters',
    ]);

    isValid = userValidator.validate({ ...props, email: '' });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
    ]);

    isValid = userValidator.validate({ ...props, email: 10 as any });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['email']).toStrictEqual([
      'email must be an email',
      'email must be a string',
      'email must be shorter than or equal to 255 characters',
    ]);

    isValid = userValidator.validate({ ...props, email: 'a'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['email']).toStrictEqual([
      'email must be an email',
      'email must be shorter than or equal to 255 characters',
    ]);
  });

  it('Invalidation cases for password field', () => {
    let isValid = userValidator.validate(null as any);
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['password']).toStrictEqual([
      'password should not be empty',
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ]);

    isValid = userValidator.validate({ ...props, password: '' });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['password']).toStrictEqual([
      'password should not be empty',
    ]);

    isValid = userValidator.validate({ ...props, password: 10 as any });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['password']).toStrictEqual([
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ]);

    isValid = userValidator.validate({ ...props, password: 'a'.repeat(256) });
    expect(isValid).toBeFalsy();
    expect(userValidator.errors['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters',
    ]);
  });
});
