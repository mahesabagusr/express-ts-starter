export type ApiResponse = {
  status: boolean;
  data: any;
  message: string;
  code: number;
};

export type ErrorResponse = {
  err: Error;
  data: null;
};

export type SuccessResponse = {
  err: null;
  data: any;
};
