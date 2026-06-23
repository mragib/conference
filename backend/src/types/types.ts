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

export type ReviewerAssignResult = {
  reviewerId: string;
  userName: string;
  assignCount: number;
};

export enum RegistrationType {
  EARLY_BIRD = 'EARLY BIRD',
  REGULAR = 'REGULAR',
  LATE = 'LATE',
}

export enum CountryType {
  LOCAL = 'LOCAL',
  INTERNATIONAL = 'INTERNATIONAL',
}

export enum CurrencyType {
  BDT = 'BDT',
  USD = 'USD',
}

export enum RegistrationCategory {
  WITH_PAPER = 'WITH_PAPER',
  WITHOUT_PAPER = 'WITHOUT_PAPER',
}

export enum PaymentStatus {
  INITIAL = 'INITIAL',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCEL = 'CANCEL',
}

export enum AbstractFieldEnum {
  PURPOSE = 'purpose',
  METHODOLOGY = 'methodology',
  FINDINGS = 'findings',
  THEORETICAL = 'theoretical',
  PRACTICAL = 'practical',
  OVERALL = 'overall',
}

export enum AbstractMark {
  EXCELLENT = 'Excellent',
  VERY_GOOD = 'Very Good',
  GOOD = 'Good',
  WEAK = 'Weak',
}
