import { Entity } from '../../../../shared/domain/entities/entity';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(public props: UserProps, id?: string) {
    super(props, id);
  }

  public update(props: UserProps): void {
    this.seProps(props);
  }

  private seProps(props: UserProps): void {
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
    this.setPassword(value);
  }

  private setPassword(value: string) {
    this.props.password = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
