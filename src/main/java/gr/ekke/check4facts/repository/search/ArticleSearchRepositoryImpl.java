package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.Article;

import org.jsoup.Jsoup;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ArticleSearchRepositoryImpl implements ArticleSearchRepositoryCustom {

    private final ApplicationContext applicationContext;

    public ArticleSearchRepositoryImpl(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    private ArticleSearchRepository getArticleSearchRepository() {
        return applicationContext.getBean(ArticleSearchRepository.class);
    }

    @Override
    public Article saveCustom(Article article) {
        article.setContent(extractPlainText(article.getContent()));  // Remove HTML
        return getArticleSearchRepository().save(article);
    }

    @Override
    public Iterable<Article> saveAllCustom(Iterable<Article> articles) {
        List<Article> processedArticles = new ArrayList<>();
        for (Article article : articles) {
            article.setContent(extractPlainText(article.getContent()));  // Remove HTML
            processedArticles.add(article);
        }
        return getArticleSearchRepository().saveAll(processedArticles);
    }

    private String extractPlainText(String htmlContent) {
        return Jsoup.parse(htmlContent).text();  // Extract plain text
    }
}

