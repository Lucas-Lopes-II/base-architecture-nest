import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService unit tests', () => {
  let envConfigService: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    envConfigService = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(envConfigService).toBeDefined();
  });

  it('should return the variable PORT', () => {
    expect(envConfigService.getAppPort()).toBe(3000);
  });

  it('should return the variable NODE_ENV', () => {
    expect(envConfigService.getNodeEnv()).toBe('test');
  });
});
