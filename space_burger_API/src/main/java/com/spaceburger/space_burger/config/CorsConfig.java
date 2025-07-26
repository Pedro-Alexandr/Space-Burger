package com.spaceburger.space_burger.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "https://spaceburger.com",
                        "https://www.spaceburger.com",
                        "https://app.spaceburger.com",
                        "https://space-burger-dks9-pohnxke5q-pedro-alexandrs-projects.vercel.app/",
                        "https://space-burger-dks9-pohnxke5q-pedro-alexandrs-projects.vercel.app",
                        "https://space-burger-dks9-pedro-alexandrs-projects.vercel.app/",
                        "https://space-burger-dks9-pedro-alexandrs-projects.vercel.app",
                        "https://space-burger-dks9-git-main-pedro-alexandrs-projects.vercel.app/",
                        "https://space-burger-dks9-git-main-pedro-alexandrs-projects.vercel.app",
                        "https://space-burger-dks9.vercel.app",
                        "https://space-burger-dks9.vercel.app/",
                        "http://localhost:5173",
                        "http://127.0.0.1:5173"
                )
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("Authorization", "Content-Type", "X-Requested-With")
                .allowCredentials(true)
                .maxAge(3600);
    }
}