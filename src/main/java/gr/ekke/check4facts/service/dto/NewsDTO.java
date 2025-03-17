package gr.ekke.check4facts.service.dto;

public class NewsDTO {
  private Long id;
  private String title;

  public NewsDTO(Long id, String title) {
    this.id = id;
    this.title = title;
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }
}
