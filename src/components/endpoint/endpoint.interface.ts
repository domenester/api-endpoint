export type Verb = "get" | "put" | "post" | "delete";

export interface IRequest<TBody extends {} = any, THeaders extends {} = any, TParameters extends {} = any> {
  headers?: { [index: string]: string | string[] };
  parameters?: { [index: string]: string };
  body?: TBody;
}

export interface IEndpoint<TRequest extends {}, TResult extends {}> {
  path: string;
  bodySchema: any;
  method: Verb;
  body?: any;
  handler: (requestData: IRequest<TRequest>) => Promise<TResult> | TResult;
}

export interface IEndpointAPI {
  path: string;
  endpoints: Array<IEndpoint<IRequest, {}>>;
}

export interface IHandlerResponse {
  data: any;
  message?: string;
}

export type HandlerResponse = IHandlerResponse | Error;
