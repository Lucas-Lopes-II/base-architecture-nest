import { Entity } from '../../../../shared/domain/entities/entity';
import { UserValidatorFactory } from './../validators/user.validator';
import { EntityValidationError } from './../../../../shared/domain/errors/validation-error';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(public props: UserProps, id?: string) {
    UserEntity.validate(props);
    super(props, id);
  }

  public update(props: UserProps): void {
    this.seProps(props);
  }

  private seProps(props: UserProps): void {
    UserEntity.validate(props);
    this.props = props;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  public updatePassword(value: string): void {
    UserEntity.validate({
      ...this.props,
      password: value,
    });
    this.setPassword(value);
  }

  private setPassword(value: string) {
    this.props.password = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) throw new EntityValidationError(validator.errors);
  }
}
