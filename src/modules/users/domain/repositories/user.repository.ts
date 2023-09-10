import { UserEntity } from '../entities/user.entity';
import { ISearchableRepository } from './../../../../shared/domain/repositories/searchable-repository.interface';

export interface IUserRepository
  extends ISearchableRepository<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>;
  emailExists(email: string): Promise<void>;
}
