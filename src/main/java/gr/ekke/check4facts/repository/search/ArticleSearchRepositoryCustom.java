package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.Article;

public interface ArticleSearchRepositoryCustom {
    Article saveCustom(Article article);
    Iterable<Article> saveAllCustom(Iterable<Article> articles);
}
