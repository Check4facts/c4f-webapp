package gr.ekke.check4facts.service.dto;

public class ArticleDTO {
  private Long id;
  private String previewTitle;

  public ArticleDTO(Long id, String previewTitle) {
    this.id = id;
    this.previewTitle = previewTitle;
  }

  public Long getId() {
    return id;
  }

  public String getPreviewTitle() {
    return previewTitle;
  }
}
