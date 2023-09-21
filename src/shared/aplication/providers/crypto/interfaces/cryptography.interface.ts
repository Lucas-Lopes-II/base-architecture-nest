export const CRYPTOGRAPHY = Symbol('ICryptography');

export interface ICryptography {
  hash(data: string | Buffer, saltOrRounds: string | number): Promise<string>;

  compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
