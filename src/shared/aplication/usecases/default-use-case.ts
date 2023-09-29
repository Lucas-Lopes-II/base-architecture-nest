export interface DefaultUseCase<Input, Output> {
  execute(input: Input): Output | Promise<Output>;
}
