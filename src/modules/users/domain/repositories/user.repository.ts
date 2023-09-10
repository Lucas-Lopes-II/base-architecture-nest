import { UserEntity } from '../entities/user.entity';
import { IRepository } from './../../../../shared/domain/repositories/repository.interface';

export interface UserRepository extends IRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
  emailExists(email: string): Promise<void>;
}
