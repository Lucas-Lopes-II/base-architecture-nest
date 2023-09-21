import { Bcrypt } from './../../crypto/bcrypt/bcrypt.provider';

describe('Bcrypt unit tests', () => {
  let bcrypt: Bcrypt;

  beforeEach(() => {
    bcrypt = new Bcrypt();
  });

  it('Should return encrypted password', async () => {
    const password = 'TestPassword123';
    const hash = await bcrypt.hash(password, 10);
    expect(hash).toBeDefined();
  });

  it('Should return false on invalid password and hash comparison', async () => {
    const password = 'TestPassword123';
    const hash = await bcrypt.hash(password, 10);
    const result = await bcrypt.compare('fake', hash);
    expect(result).toBeFalsy();
  });

  it('Should return true on valid password and hash comparison', async () => {
    const password = 'TestPassword123';
    const hash = await bcrypt.hash(password, 10);
    const result = await bcrypt.compare(password, hash);
    expect(result).toBeTruthy();
  });
});
