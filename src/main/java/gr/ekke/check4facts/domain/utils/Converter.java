package gr.ekke.check4facts.domain.utils;

import gr.ekke.check4facts.domain.StatementSource;
import gr.ekke.check4facts.domain.SubTopic;
import org.apache.commons.validator.GenericValidator;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Converter {

    public Instant stringToInstant(String s) {
        if (GenericValidator.isDate(s,"dd/MM/yyyy", true)) {
            try {
                return new SimpleDateFormat("dd/MM/yyyy").parse(s).toInstant().plus(2, ChronoUnit.HOURS);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        } else {
            try {
                return new SimpleDateFormat("d/M/yyyy").parse(s).toInstant().plus(2, ChronoUnit.HOURS);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public Set<StatementSource> stringsToStatementSources(String s1, String s2) {
        String[] split1 = s1.split(", ");
        String[] split2 = s2.split(", ");
        // FIXME Urge EKKE to properly define via comma-space separator their inputs
        if (split1.length != split2.length) return new HashSet<>();

        Set<StatementSource> statementSources = new HashSet<>();
        for (int index = 0; index < split1.length; index++) {
            StatementSource statementSource = new StatementSource();
            statementSource.setTitle(split1[index]);
            statementSource.setUrl(split2[index]);
            statementSource.setSnippet("");
            statementSources.add(statementSource);
        }

        return statementSources;
    }

    public Set<SubTopic> stringToSubTopics(String s, List<SubTopic> existing) {
        String[] split = s.split("/");

        Set<SubTopic> subTopics = new HashSet<>();
        for (String value : split) {
            for (SubTopic subTopic : existing) {
                if (subTopic.getName().equalsIgnoreCase(value)) {
                    subTopics.add(subTopic);
                    break;
                }
            }
        }
        return subTopics;
    }

    public Boolean stringToFactCheckerLabel(String s) {
        if (s.equalsIgnoreCase("true")) {
            return true;
        } else if (s.equalsIgnoreCase("false")) {
            return false;
        } else {
            return null;
        }
    }
}
