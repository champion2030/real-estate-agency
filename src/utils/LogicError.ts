export interface ErrorCodeItem {
  message: string;
  code: number;
  type: string;
}

export class LogicError extends Error {
  public code: number;
  public type: string;
  public data: any;

  constructor(errorCodeItem: ErrorCodeItem, data?: any) {
    const { message, type, code = 400 } = errorCodeItem;
    super(message);
    this.code = code;
    this.type = type;
    this.data = data;
  }

}
