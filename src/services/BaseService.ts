export class BaseService {
  public success<T>(data: T, message: string = 'Success') {
    return {
      status: 'success',
      message,
      data
    };
  }

  public error(message: string = 'Error', code: number = 500) {
    return {
      status: 'error',
      message,
      code
    };
  }
}
