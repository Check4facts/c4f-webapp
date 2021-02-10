export interface IModalContent {
  header: any;
  body: any;
  action: () => void;
}

export type TaskInfo = {
  current: number;
  total: number;
  status: string;
};

export interface ITaskStatus {
  info: TaskInfo;
  status: string;
  taskId: string;
}
