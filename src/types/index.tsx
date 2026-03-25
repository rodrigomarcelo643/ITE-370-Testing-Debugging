
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
  };
}

export interface TestResult {
  testName: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  timestamp: Date;
}

export interface SecurityTest {
  name: string;
  input: string;
  description: string;
  expectedBehavior: string;
}