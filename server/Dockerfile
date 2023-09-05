# Use JDK image
FROM eclipse-temurin:17-jdk-alpine
# This is the server port that the Spring Boot Application is running
EXPOSE 8080
# Always add a volume for a container made using this image
# VOLUME /tmp
# JAR_FILE path
ARG JAR_FILE=target/*.jar
# COPY .jar file from the spring boot code used to make the file to the container
COPY ${JAR_FILE} /app.jar
# Run the .jar file on the start of a container
ENTRYPOINT ["java", "-jar", "/app.jar"]