package gr.ekke.check4facts;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("gr.ekke.check4facts");

        noClasses()
            .that()
                .resideInAnyPackage("gr.ekke.check4facts.service..")
            .or()
                .resideInAnyPackage("gr.ekke.check4facts.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..gr.ekke.check4facts.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
