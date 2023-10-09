import {Response} from 'express';

export enum StatusCodes {
  SUCCESS = 200,
  INTERNAL_ERROR = 500,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNPROCESSABLE_CONTENT = 422
}

export class HttpClientHelper {

  public static send<T>(response: Response, data: HttpResponseContent<T>): void {
    response.status(data.code).json({...data, status: this.getStatusByCode(data.code)});
  }

  private static getStatusByCode(code: number) {
    switch (code) {
      case StatusCodes.SUCCESS:
        return "SUCCESS"
      case StatusCodes.INTERNAL_ERROR:
        return "INTERNAL_ERROR";
      case StatusCodes.UNAUTHORIZED:
        return "UNAUTHORIZED";
      case StatusCodes.NOT_FOUND:
        return "NOT_FOUND"
      case StatusCodes.BAD_REQUEST:
        return "BAD_REQUEST"
      default:
        return "INTERNAL_ERROR";
    }
  }
}

export interface HttpResponseContent<T> {
  code: StatusCodes;
  payload?: T;
  error?: string;
  innerError?: object;
}

export interface List<T> {
  items: Array<T>,
  pagination: Pagination
}

interface Pagination {
  pages: number;
  pageSize: number;
  allRecordsCount: number;
}
