import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SignupUseCase } from '../../application/usecases';

export class SignupDto implements SignupUseCase.Input {
  @IsString()
  @MinLength(2, { message: 'Name must contain at least 2 characters' })
  @MaxLength(100, { message: 'Name must contain a maximum of 100 characters' })
  name: string;

  @IsEmail({}, { message: 'Email must be in valid format' })
  @MinLength(6, { message: 'Email must contain at least 6 characters' })
  @MaxLength(50, { message: 'Email must contain a maximum of 50 characters' })
  email: string;

  @IsString({ message: 'Password must be string' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(50, {
    message: 'Password must contain a maximum of 50 characters',
  })
  @Matches(/(?=^.{6,}$)((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must contain 6 characters, an uppercase letter, a lowercase letter and a special character',
  })
  password: string;
}
