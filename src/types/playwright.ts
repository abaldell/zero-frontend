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
