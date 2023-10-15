import { SignupDto } from '../../dtos';
import { UsersController } from '../../users.controller';
import { SignupUseCase } from '../../../application/usecases';
import { UserOutput } from './../../../application/dtos/user-output';

describe('UsersController unit tests', () => {
  let usersController: UsersController;
  let id: string;
  let props: UserOutput;

  beforeEach(async () => {
    usersController = new UsersController();
    id = 'df96ae94-6128-486e-840c-b6f78abb4801';
    props = {
      id,
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a user', async () => {
    const output: SignupUseCase.Output = props;
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    usersController['signupUseCase'] = mockSignupUseCase as any;
    const input: SignupDto = {
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
    };
    const result = await usersController.create(input);
    expect(output).toMatchObject(result);
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input);
  });
});
