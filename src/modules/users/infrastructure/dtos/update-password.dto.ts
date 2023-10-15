import { UpdatePasswordUseCase } from '../../application/usecases';

export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
  password: string;
  oldPassword: string;
}
