package gr.ekke.check4facts.web.rest;

import java.util.Base64;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import gr.ekke.check4facts.domain.Article;
import gr.ekke.check4facts.service.ArticleService;

@Controller
public class ClientForwardController {

    private final Logger log = LoggerFactory.getLogger(ClientForwardController.class);

    @Autowired
    ArticleService articleService;

    /**
     * Forwards any unmapped paths (except those containing a period) to the client {@code index.html}.
     * @return forward to client {@code index.html}.
     */
    @GetMapping(value = "/**/{path:[^\\.]*}")
    public String forward() {
        return "forward:/";
    }

    @GetMapping("/article/{id}/display")
    public String forwardToArticleDisplay(@PathVariable Long id, Model model) {
    Optional<Article> article = articleService.findOne(id);
    if (article.isPresent()) {

        Article foundArticle = article.get();
        model.addAttribute("ogTitle", foundArticle.getPreviewTitle());
        model.addAttribute("ogDescription", foundArticle.getPreviewText());
        model.addAttribute("ogImage", "data:" + foundArticle.getPreviewImageContentType() + ";base64," 
        + Base64.getEncoder().encodeToString(foundArticle.getPreviewImage()));
        model.addAttribute("ogAuthor", foundArticle.getAuthor());

    }
    // Thymeleaf template will use these attributes to generate meta tags
    // return "article/display";
    return "index";
}
}
