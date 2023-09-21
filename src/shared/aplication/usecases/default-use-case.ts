export interface DefaoultUseCase<Input, Output> {
  execute(input: Input): Output | Promise<Output>;
}
