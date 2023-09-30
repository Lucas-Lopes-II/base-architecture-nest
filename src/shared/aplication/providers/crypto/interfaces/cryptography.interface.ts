export const CRYPTOGRAPHY = Symbol('ICryptography');

export interface ICryptography {
  hash(data: string | Buffer): Promise<string>;

  compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
