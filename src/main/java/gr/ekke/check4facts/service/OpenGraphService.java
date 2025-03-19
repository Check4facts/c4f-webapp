package gr.ekke.check4facts.service;

import gr.ekke.check4facts.service.dto.OpenGraphMetadata;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class OpenGraphService {
  private final Map<String, OpenGraphMetadata> cache = new ConcurrentHashMap<>();
  private final Logger log = LoggerFactory.getLogger(OpenGraphService.class);

  public OpenGraphMetadata fetchMetadata(String url) throws IOException {
    if (cache.containsKey(url)) {
      return cache.get(url);
    }

    Document doc = Jsoup.connect(url).timeout(5000).get();
    OpenGraphMetadata metadata = new OpenGraphMetadata(
      url,
      getMetaTagContent(doc, "og:title"),
      getMetaTagContent(doc, "og:description"),
      getMetaTagContent(doc, "og:image")
    );

    cache.put(url, metadata);
    return metadata;
  }

  public List<OpenGraphMetadata> fetchMetadataForUrls(List<String> urls) throws IOException {
    List<OpenGraphMetadata> metadataList = new ArrayList<>();
    for (String url : urls) {
      try {
        metadataList.add(fetchMetadata(url));
      } catch (IOException e) {
        // Log the error and continue with the next URL
        log.error("Failed to fetch metadata for URL: {} ",url,  e);
      }
    }
    return metadataList;
  }

  private String getMetaTagContent(Document doc, String property) {
    Element tag = doc.select("meta[property=" + property + "]").first();
    return tag != null ? tag.attr("content") : "";
  }
}
