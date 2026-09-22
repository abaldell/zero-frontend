export type FileType = 'directory' | 'file';

export interface TestFileNode {
  name: string;
  type: FileType;
  path: string;
  children?: TestFileNode[];
}

export interface ScriptSet {
  key: string;
  command: string;
  description: string;
}

export interface TestRunSummary {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  duration?: string;
  output: string;
  reportPath?: string;
}

export interface TestPW{
  id:number,
  path: string
}

export interface PwExecution {
  spiraTestCaseId: string;
  title: string;
  status: string;
  duration: number;
  steps: PwStep[];
}

export interface PwStep {
  name: string;
  status: string;
  actualResult: string;
  error?: string;
}