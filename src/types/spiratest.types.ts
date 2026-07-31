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
  Description: string | null;

  TestSetStatusId: number;
  TestSetStatusName: string;

  ProjectId: number;
  ProjectName: string;

  ReleaseId: number | null;
  ReleaseVersionNumber: string | null;

  CreationDate: string;
  LastUpdateDate: string;
  PlannedDate: string | null;
  ExecutionDate: string | null;

  OwnerId: number | null;
  OwnerName: string | null;

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

  TestSetFolderId: number | null;
}

export interface ProjectDetails{
  ProjectId: number | null;
  ProjectTemplateId: number | null;
  ProjectGroupId: number | null;
  Name: string | null;
  Description: string | null;
  Website: string | null;
  CreationDate: string;
  Active: boolean;
  WorkingHours: number;
  WorkingDays: number;
  NonWorkingHours: number;
  StartDate: string | null;
  EndDate: string | null;
  PercentComplete: number;
  RequirementCount: number;
  WorkspaceTypeId: number;
  Guid: string | null;
  LastUpdatedDate: string | null;
  ArtifactTypeId: number;
  ConcurrencyGuid: string | null;
  CustomProperties: unknown | null;
};

export interface TestSet {
  TestSetId: number | null;
  IndentLevel: number | null;
  TestSetStatusId: number;
  CreatorId: number | null;
  OwnerId: number | null;
  CreatorGuid: string | null;
  OwnerGuid: string | null;
  ReleaseId: number | null;
  ReleaseGuid: string | null;
  AutomationHostId: number | null;
  TestRunTypeId: number | null;
  RecurrenceId: number | null;
  Name: string | null;
  Description: string | null;
  CreationDate: string;
  LastUpdateDate: string;
  PlannedDate: string | null;
  ExecutionDate: string | null;
  CountPassed: number | null;
  CountFailed: number | null;
  CountCaution: number | null;
  CountBlocked: number | null;
  CountNotRun: number | null;
  CountNotApplicable: number | null;
  CreatorName: string | null;
  OwnerName: string | null;
  ProjectName: string | null;
  TestSetStatusName: string | null;
  ReleaseVersionNumber: string | null;
  RecurrenceName: string | null;
  TestSetFolderId: number | null;
  EstimatedDuration: number | null;
  ActualDuration: number | null;
  IsAutoScheduled: boolean;
  IsDynamic: boolean;
  DynamicQuery: string | null;
  TestConfigurationSetId: number | null;
  BuildExecuteTimeInterval: number | null;
  ProjectId: number;
  ProjectGuid: string | null;
  ArtifactTypeId: number;
  ConcurrencyDate: string;
  CustomProperties: unknown[] | null;
  IsAttachments: boolean;
  Tags: string[] | null;
  Guid: string | null;
}

export interface CaseTestSet {
  TestCaseId: number | null;
  ExecutionStatusId: number | null;
  AuthorId: number | null;
  OwnerId: number | null;
  AuthorGuid: string | null;
  OwnerGuid: string | null;
  TestCasePriorityId: number | null;
  TestCaseTypeId: number | null;
  TestCaseStatusId: number;
  TestCaseFolderId: number | null;
  ComponentIds: number[] | null;
  AutomationEngineId: number | null;
  AutomationAttachmentId: number | null;
  Name: string | null;
  Description: string | null;
  CreationDate: string;
  LastUpdateDate: string;
  ExecutionDate: string | null;
  EstimatedDuration: number | null;
  AuthorName: string | null;
  OwnerName: string | null;
  ProjectName: string | null;
  TestCasePriorityName: string | null;
  TestCaseStatusName: string | null;
  TestCaseTypeName: string | null;
  ExecutionStatusName: string | null;
  TestSteps: unknown[] | null;
  ActualDuration: number | null;
  IsSuspect: boolean;
  IsTestSteps: boolean;
  ProjectId: number;
  ProjectGuid: string | null;
  ArtifactTypeId: number;
  ConcurrencyDate: string;
  CustomProperties: unknown[] | null;
  IsAttachments: boolean;
  Tags: string[] | null;
  Guid: string | null;
}