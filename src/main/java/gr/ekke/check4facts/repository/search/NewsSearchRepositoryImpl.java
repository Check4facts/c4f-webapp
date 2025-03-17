package gr.ekke.check4facts.repository.search;

import org.jsoup.Jsoup;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Repository;

import gr.ekke.check4facts.domain.News;

import java.util.ArrayList;
import java.util.List;

@Repository
public class NewsSearchRepositoryImpl implements NewsSearchRepositoryCustom {

    private final ApplicationContext applicationContext;

    public NewsSearchRepositoryImpl(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    private NewsSearchRepository getNewsSearchRepository() {
        return applicationContext.getBean(NewsSearchRepository.class);
    }

    @Override
    public News saveCustom(News n) {
        n.setContent(extractPlainText(n.getContent()));  // Remove HTML
        return getNewsSearchRepository().save(n);
    }

    @Override
    public Iterable<News> saveAllCustom(Iterable<News> news) {
        List<News> processedNews = new ArrayList<>();
        for (News n : news) {
            n.setContent(extractPlainText(n.getContent()));  // Remove HTML
            processedNews.add(n);
        }
        return getNewsSearchRepository().saveAll(processedNews);
    }

    private String extractPlainText(String htmlContent) {
        return Jsoup.parse(htmlContent).text();  // Extract plain text
    }
}
