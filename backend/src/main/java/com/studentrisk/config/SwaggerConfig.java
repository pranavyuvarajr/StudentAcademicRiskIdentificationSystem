package com.studentrisk.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Student Academic Risk Identification System API")
                .version("1.0.0")
                .description("""
                    REST API for identifying and managing academically at-risk students.
                    
                    **Roles:**
                    - `ADMIN` — upload CSV, manage mentors, assign students
                    - `MENTOR` — view assigned students, add feedback comments
                    - `STUDENT` — view personal academic data and mentor comments
                    
                    **Risk Score Formula:**
                    ```
                    Score = (100-attendance)*0.15 + (100-currCgpa*10)*0.20 +
                            (100-prevCgpa*10)*0.10 + (100-recentTest)*0.15 +
                            (100-internalMark)*0.10 + (backlogs*10)*0.10 +
                            (100-projectScore)*0.10 + (100-project)*0.10
                    ```
                    0–33 = LOW | 34–66 = MEDIUM | 67–100 = HIGH
                    """)
                .contact(new Contact()
                    .name("Admin")
                    .email("admin@college.edu"))
            )
            .tags(List.of(
                new Tag().name("Auth").description("Login endpoint"),
                new Tag().name("Students").description("Student data and CSV upload"),
                new Tag().name("Users").description("Mentor management"),
                new Tag().name("Comments").description("Mentor feedback on students")
            ));
    }
}
