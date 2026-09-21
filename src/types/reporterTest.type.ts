export interface ReporterStep {
  title: string;
  category: string;
  parent?: string;
  error?: string;
  duration?: number;
  status:string;
}

export interface TestStepNode {
  title: string;
  duration?: number;
  category?: string;
  status:string;
  error?: string;
  children: TestStepNode[];
}
