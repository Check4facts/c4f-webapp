package gr.ekke.check4facts.repository.search;

import gr.ekke.check4facts.domain.News;

public interface NewsSearchRepositoryCustom {
    News saveCustom(News n);

    Iterable<News> saveAllCustom(Iterable<News> news);
}
