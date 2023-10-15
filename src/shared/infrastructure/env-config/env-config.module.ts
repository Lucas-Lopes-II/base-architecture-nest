import { Module, Global } from '@nestjs/common';

import { EnvConfig } from './env-config';
import { IEnvConfig } from './env-config.interface';

@Global()
@Module({
  providers: [
    {
      provide: IEnvConfig,
      useClass: EnvConfig,
    },
  ],
  exports: [IEnvConfig],
})
export class EnvConfigModule {}
