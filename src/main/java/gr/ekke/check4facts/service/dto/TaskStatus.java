package gr.ekke.check4facts.service.dto;

public class TaskStatus {

    private TaskInfo taskInfo;

    private String status;

    private String taskId;

    public TaskStatus() {
    }

    public TaskStatus(TaskInfo taskInfo, String status, String taskId) {
        this.taskInfo = taskInfo;
        this.status = status;
        this.taskId = taskId;
    }

    public TaskInfo getTaskInfo() {
        return taskInfo;
    }

    public void setTaskInfo(TaskInfo taskInfo) {
        this.taskInfo = taskInfo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    @Override
    public String toString() {
        return "TaskStatus{" +
            "taskInfo=" + taskInfo +
            ", status='" + status + '\'' +
            ", taskId='" + taskId + '\'' +
            '}';
    }
}
