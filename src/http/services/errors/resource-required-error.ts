export class ResourceRequiredError extends Error {
  constructor() {
    super('City and state are required.')
  }
}
