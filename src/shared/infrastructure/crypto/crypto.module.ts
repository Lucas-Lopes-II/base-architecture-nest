import { Global, Module } from '@nestjs/common';

import { Bcrypt } from '../../aplication/crypto';
import { CRYPTOGRAPHY } from '../../aplication/crypto';

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
