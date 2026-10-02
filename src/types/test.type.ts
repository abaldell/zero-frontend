
export type TestStatus =
  | "running"
  | "passed"
  | "failed"
  | "timedOut"
  | "skipped"
  | "interrupted";

export type TestStatusReport = "idle" | "loading" | "success" | "error";

export interface TestResult {
  id: string;
  title: string;
  file: string;
  project: string;
  status?: string;
  duration: number;
  retries: number;
  error?: ErrorStep;
  steps: TestResult[];
  attachments: TestAttachment[];
  parent?: string;
  category?:string;
  children?:TestResult[];
  details?:string;
}

export interface TestStep {
  title: string;
  duration?: number;
  error?: string;
}

export interface TestAttachment {
  name: string;
  contentType: string;
  path: string;
}

export interface ErrorStep{
  location:{
    column: number,
    file: string,
    line: number
  }
  message: string,
  snippet: string,
  stack: string
}
