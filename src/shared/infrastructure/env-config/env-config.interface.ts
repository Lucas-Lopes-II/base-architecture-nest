export abstract class IEnvConfig {
  abstract getAppPort(): number;
  abstract getNodeEnv(): string;
}
