import { SignupUseCase } from '../../application/usecases';

export class SignupDto implements SignupUseCase.Input {
  name: string;
  email: string;
  password: string;
}
