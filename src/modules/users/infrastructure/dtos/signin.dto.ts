import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SigninUseCase } from '../../application/usecases/signin.usecase';

export class SigninDto implements SigninUseCase.Input {
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
