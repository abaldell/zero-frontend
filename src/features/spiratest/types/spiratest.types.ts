export interface TestCase {
  id: number;
  name: string;
}

export interface TestSetNodeInterface {
  id: number;
  name: string;
  testCases: TestCase[];
}

export interface SpiraTestSet {
  TestSetId: number;
  Name: string;
  Description: string;

  TestSetStatusId: number;
  TestSetStatusName: string;

  ProjectId: number;
  ProjectName: string;

  ReleaseId: number;
  ReleaseVersionNumber: string;

  CreationDate: string;
  LastUpdateDate: string;
  PlannedDate: string;
  ExecutionDate: string;

  OwnerId: number;
  OwnerName: string;

  CreatorId: number;
  CreatorName: string;

  CountPassed: number;
  CountFailed: number;
  CountBlocked: number;
  CountNotRun: number;

  EstimatedDuration: number;
  ActualDuration: number;

  IsDynamic: boolean;
  IsAutoScheduled: boolean;

  TestSetFolderId: number;
}

export interface ProjectDetails{
  ProjectId: number;
  ProjectTemplateId: number;
  ProjectGroupId: number;
  Name: string;
  Description: string;
  Website: string;
  CreationDate: string;
  Active: boolean;
  WorkingHours: number;
  WorkingDays: number;
  NonWorkingHours: number;
  StartDate: string;
  EndDate: string;
  PercentComplete: number;
  RequirementCount: number;
  WorkspaceTypeId: number;
  Guid: string;
  LastUpdatedDate: string;
  ArtifactTypeId: number;
  ConcurrencyGuid: string;
  CustomProperties: unknown;
};

export interface TestSet {
  TestSetId: number;
  IndentLevel: number;
  TestSetStatusId: number;
  CreatorId: number;
  OwnerId: number;
  CreatorGuid: string;
  OwnerGuid: string;
  ReleaseId: number;
  ReleaseGuid: string;
  AutomationHostId: number;
  TestRunTypeId: number;
  RecurrenceId: number;
  Name: string;
  Description: string;
  CreationDate: string;
  LastUpdateDate: string;
  PlannedDate: string;
  ExecutionDate: string;
  CountPassed: number;
  CountFailed: number;
  CountCaution: number;
  CountBlocked: number;
  CountNotRun: number;
  CountNotApplicable: number;
  CreatorName: string;
  OwnerName: string;
  ProjectName: string;
  TestSetStatusName: string;
  ReleaseVersionNumber: string;
  RecurrenceName: string;
  TestSetFolderId: number;
  EstimatedDuration: number;
  ActualDuration: number;
  IsAutoScheduled: boolean;
  IsDynamic: boolean;
  DynamicQuery: string;
  TestConfigurationSetId: number;
  BuildExecuteTimeInterval: number;
  ProjectId: number;
  ProjectGuid: string;
  ArtifactTypeId: number;
  ConcurrencyDate: string;
  CustomProperties: unknown[];
  IsAttachments: boolean;
  Tags: string[];
  Guid: string;
}

export interface CaseTestSet {
  TestCaseId: number;
  ExecutionStatusId: number;
  AuthorId: number;
  OwnerId: number;
  AuthorGuid: string;
  OwnerGuid: string;
  TestCasePriorityId: number;
  TestCaseTypeId: number;
  TestCaseStatusId: number;
  TestCaseFolderId: number;
  ComponentIds: number[];
  AutomationEngineId: number;
  AutomationAttachmentId: number;
  Name: string;
  Description: string;
  CreationDate: string;
  LastUpdateDate: string;
  ExecutionDate: string;
  EstimatedDuration: number;
  AuthorName: string;
  OwnerName: string;
  ProjectName: string;
  TestCasePriorityName: string;
  TestCaseStatusName: string;
  TestCaseTypeName: string;
  ExecutionStatusName: string;
  TestSteps: unknown[];
  ActualDuration: number;
  IsSuspect: boolean;
  IsTestSteps: boolean;
  ProjectId: number;
  ProjectGuid: string;
  ArtifactTypeId: number;
  ConcurrencyDate: string;
  CustomProperties: unknown[];
  IsAttachments: boolean;
  Tags: string[];
  Guid: string;
}