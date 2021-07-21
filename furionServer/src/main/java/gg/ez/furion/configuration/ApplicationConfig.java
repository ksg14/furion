package gg.ez.furion.configuration;

import gg.ez.furion.service.FirebaseService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Configuration
public class ApplicationConfig {

    @Bean
    public FirebaseService getFirebaseService () {
        return new FirebaseService();
    }

    @Bean
    public RestTemplate getRestTemplate () {
        return new RestTemplate();
    }
}
