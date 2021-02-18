package gr.ekke.check4facts.service.dto;

public class TaskInfo {

    private Integer current;

    private Integer total;

    private String type;

    public TaskInfo() {
    }

    public TaskInfo(Integer current, Integer total, String type) {
        this.current = current;
        this.total = total;
        this.type = type;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "TaskInfo{" +
            "current=" + current +
            ", total=" + total +
            ", type='" + type + '\'' +
            '}';
    }
}
