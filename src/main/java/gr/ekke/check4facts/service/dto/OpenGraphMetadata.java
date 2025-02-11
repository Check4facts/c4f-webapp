package gr.ekke.check4facts.service.dto;

public class OpenGraphMetadata {
  private String url;
  private String title;
  private String description;
  private String image;

  public OpenGraphMetadata(String url, String title, String description, String image) {
    this.url = url;
    this.title = title;
    this.description = description;
    this.image = image;
  }

  public String getUrl() {
    return url;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getImage() {
    return image;
  }

  // prettier-ignore
  @Override
  public String toString() {
    return "OpenGraphMetadata{" +
      "url=" + getUrl() +
        ", title='" + getDescription() + "'" +
        ", description='" + getDescription() + "'" +
        ", image='" + getImage() + "'" +
        "}";
  }
}
