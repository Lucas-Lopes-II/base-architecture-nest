import { Global, Module } from '@nestjs/common';

import { Bcrypt } from './bcrypt/bcrypt';
import { CRYPTOGRAPHY } from './interfaces/cryptography.interface';

@Global()
@Module({
  providers: [
    {
      provide: CRYPTOGRAPHY,
      useClass: Bcrypt,
    },
  ],
  exports: [
    {
      provide: CRYPTOGRAPHY,
      useClass: Bcrypt,
    },
  ],
})
export class CryptoModule {}
