import { Global, Module } from '@nestjs/common';

import { Bcrypt } from './../../aplication/providers';
import { CRYPTOGRAPHY } from './../../aplication/providers';

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
