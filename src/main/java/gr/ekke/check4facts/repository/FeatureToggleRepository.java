package gr.ekke.check4facts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gr.ekke.check4facts.domain.FeatureToggle;

public interface FeatureToggleRepository extends JpaRepository<FeatureToggle, String> {
}
