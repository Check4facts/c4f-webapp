package gr.ekke.check4facts.domain;

import java.util.List;

public class CategorizedArticles {
    private String categoryName;
    private List<Article> categoryArticles;


    public CategorizedArticles() {
    }
     

    public CategorizedArticles(String categoryName, List<Article> categoryArticles) {
        this.categoryName = categoryName;
        this.categoryArticles = categoryArticles;
    }


    public String getCategoryName() {
        return this.categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Article> getCategoryArticles() {
        return this.categoryArticles;
    }

    public void setCategoryArticles(List<Article> categoryArticles) {
        this.categoryArticles = categoryArticles;
    }
     

    @Override
    public String toString() {
        return "{" +
            " categoryName='" + getCategoryName() + "'" +
            ", categoryArticles='" + getCategoryArticles() + "'" +
            "}";
    }

}
