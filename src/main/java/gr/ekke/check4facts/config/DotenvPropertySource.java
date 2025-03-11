package gr.ekke.check4facts.config;

import org.springframework.core.env.PropertySource;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DotenvPropertySource extends PropertySource<Map<String, String>> {
    private static final String DOTENV_FILE = ".env";

    public DotenvPropertySource(String name) {
        super(name, loadEnvFile());
    }

    private static Map<String, String> loadEnvFile() {
        Map<String, String> properties = new HashMap<>();
        try {
            List<String> lines = Files.readAllLines(Paths.get(DOTENV_FILE));
            for (String line : lines) {
                if (!line.trim().isEmpty() && !line.startsWith("#")) {
                    String[] parts = line.split("=", 2);
                    if (parts.length == 2) {
                        properties.put(parts[0].trim(), parts[1].trim());
                    }
                }
            }
        } catch (IOException e) {
            System.err.println("Could not read .env file: " + e.getMessage());
        }
        return properties;
    }

    @Override
    public Object getProperty(String name) {
        return this.source.get(name);
    }
}
