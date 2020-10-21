package gr.ekke.check4facts.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import gr.ekke.check4facts.web.rest.TestUtil;

public class SubTopicTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubTopic.class);
        SubTopic subTopic1 = new SubTopic();
        subTopic1.setId(1L);
        SubTopic subTopic2 = new SubTopic();
        subTopic2.setId(subTopic1.getId());
        assertThat(subTopic1).isEqualTo(subTopic2);
        subTopic2.setId(2L);
        assertThat(subTopic1).isNotEqualTo(subTopic2);
        subTopic1.setId(null);
        assertThat(subTopic1).isNotEqualTo(subTopic2);
    }
}
