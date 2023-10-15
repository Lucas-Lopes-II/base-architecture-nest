import { SigninUseCase } from '../../application/usecases/signin.usecase';

export class SigninDto implements SigninUseCase.Input {
  email: string;
  password: string;
}
