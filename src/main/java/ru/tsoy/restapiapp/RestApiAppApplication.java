package ru.tsoy.restapiapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.HiddenHttpMethodFilter;

@SpringBootApplication
public class RestApiAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestApiAppApplication.class, args);
    }

}
