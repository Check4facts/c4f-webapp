export interface IModalContent {
  header: any;
  body: any;
  action: () => void;
}

export type TaskInfo = {
  current: number;
  total: number;
  type: string;
};

export interface ITaskStatus {
  taskInfo?: TaskInfo;
  status?: string;
  taskId?: string;
}
