import { Global, Module } from '@nestjs/common';

import { Bcrypt, ICryptography } from './../../aplication/providers';

@Global()
@Module({
  providers: [
    {
      provide: ICryptography,
      useClass: Bcrypt,
    },
  ],
  exports: [ICryptography],
})
export class CryptoModule {}
