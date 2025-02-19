package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.service.OpenGraphService;
import gr.ekke.check4facts.service.dto.OpenGraphMetadata;
import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OpenGraphResource {
  private final OpenGraphService openGraphService;

  public OpenGraphResource(OpenGraphService openGraphService) {
    this.openGraphService = openGraphService;
  }

  @GetMapping("/opengraph")
  public OpenGraphMetadata getMetadata(@RequestParam String url) throws IOException {
    return openGraphService.fetchMetadata(url);
  }

  @PostMapping("/opengraph/batch")
  public List<OpenGraphMetadata> getMetadataForUrls(@RequestBody List<String> urls) throws IOException {
    return openGraphService.fetchMetadataForUrls(urls);
  }
}
