package gr.ekke.check4facts.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import gr.ekke.check4facts.web.rest.TestUtil;

import java.util.UUID;

public class StatementSourceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatementSource.class);
        StatementSource statementSource1 = new StatementSource();
        statementSource1.setId(UUID.randomUUID());
        StatementSource statementSource2 = new StatementSource();
        statementSource2.setId(statementSource1.getId());
        assertThat(statementSource1).isEqualTo(statementSource2);
        statementSource2.setId(UUID.randomUUID());
        assertThat(statementSource1).isNotEqualTo(statementSource2);
        statementSource1.setId(null);
        assertThat(statementSource1).isNotEqualTo(statementSource2);
    }
}
