import { UpdatePasswordUseCase } from '../../application/usecases';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
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
  oldPassword: string;
}
