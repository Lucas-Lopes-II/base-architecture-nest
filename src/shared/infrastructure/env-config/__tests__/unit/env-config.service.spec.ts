import { EnvConfig } from '../../env-config';

describe('EnvConfigService unit tests', () => {
  const envConfig: EnvConfig = new EnvConfig();

  it('should be defined', () => {
    expect(envConfig).toBeDefined();
  });

  it('should return the variable PORT', () => {
    expect(envConfig.getAppPort()).toBe(3000);
  });

  it('should return the variable NODE_ENV', () => {
    expect(envConfig.getNodeEnv()).toBe('test');
  });
});
