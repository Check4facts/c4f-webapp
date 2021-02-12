package gr.ekke.check4facts.domain.utils;

import com.opencsv.bean.AbstractBeanField;
import com.opencsv.exceptions.CsvConstraintViolationException;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import org.apache.commons.validator.GenericValidator;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;

public class CustomInstantConverter extends AbstractBeanField {

    @Override
    protected Object convert(String s) throws CsvDataTypeMismatchException, CsvConstraintViolationException {
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
}
