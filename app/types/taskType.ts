export interface ITaskTypeResponse extends ITaskType {
  totalTask: number;
}

export interface ITaskType {
  name: string;
  typeId: number;
}
