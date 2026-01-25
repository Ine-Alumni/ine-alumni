package com.ine.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching  
public class IneAlumniBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(IneAlumniBackendApplication.class, args);
	}
}
