package gr.ekke.check4facts.service.dto;

public class TaskInfo {

    private Integer current;

    private Integer total;

    private String status;

    public TaskInfo() {
    }

    public TaskInfo(Integer current, Integer total, String status) {
        this.current = current;
        this.total = total;
        this.status = status;
    }

    public Integer getCurrent() {
        return current;
    }

    public void setCurrent(Integer current) {
        this.current = current;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "TaskInfo{" +
            "current=" + current +
            ", total=" + total +
            ", status='" + status + '\'' +
            '}';
    }
}
