import { hash, compare } from 'bcrypt';
import { ICryptography } from '../interfaces/cryptography.interface';

export class Bcrypt implements ICryptography {
  public hash(
    data: string | Buffer,
    saltOrRounds: string | number,
  ): Promise<string> {
    return hash(data, saltOrRounds);
  }

  public compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
