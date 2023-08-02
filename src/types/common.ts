export type TPaymentStatus = 'paid' | 'unpaid';

export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

export interface IMeta {
  pageCount: number;
  pageSize: number;
  pageIndex: number;
}

export interface IResponseData<T> {
  results: T[];
  meta: IMeta;
}

export interface IPayment {
  code: string | null;
  amount: number | null;
  paidAt: Date | null;
}

export interface IPagination {
  pageIndex: number;
  pageSize: number;
}
