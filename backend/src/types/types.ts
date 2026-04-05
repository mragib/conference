export type ApiResponse<T> = {
  status: string;
  statuscode: number;
  message?: string;
  data: T;
  count?: number;
};

export type JWTPayload = {
  sub: string;
};

export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  AUTHORITY = 'AUTHORITY',
  RESEARCHER = 'RESEARCHER',
  REVIEWER = 'REVIEWER',
}

export enum UserType {
  ACADEMIC = 'ACADEMIC',
  INDUSTRY = 'INDUSTRY',
  STUDENT = 'STUDENT',
}
