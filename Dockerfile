# Use AdoptOpenJDK image for Java 8
FROM openjdk:11-jre-slim

# Set working directory in the container
WORKDIR /app

# Expose the port your application runs on
EXPOSE 8080

# Copy your JAR file into the container
COPY target/check-4-facts-0.0.1-SNAPSHOT.jar /app/your-application.jar

# Command to run your application
CMD ["java", "-jar", "/app/your-application.jar"]