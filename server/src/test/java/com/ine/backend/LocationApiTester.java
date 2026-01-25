package com.ine.backend;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

/**
 * Simple test to verify CountriesNow API connectivity.
 * Tests fetching cities for Morocco and Spain (Barcelona).
 */
public class LocationApiTester {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.NORMAL)
                .build();
        
        System.out.println("=".repeat(60));
        System.out.println("Testing CountriesNow API");
        System.out.println("=".repeat(60));
        
        testCitiesForCountry(client, "Morocco");
        
        System.out.println("\n" + "=".repeat(60) + "\n");
        
        testCitiesForCountry(client, "Spain");
        
        System.out.println("\n" + "=".repeat(60));
        System.out.println("Tests completed!");
        System.out.println("=".repeat(60));
    }
    
    private static void testCitiesForCountry(HttpClient client, String country) throws Exception {
        System.out.println("Fetching cities for: " + country);
        System.out.println("-".repeat(60));
        
        String encodedCountry = URLEncoder.encode(country, StandardCharsets.UTF_8);
        String url = "https://countriesnow.space/api/v0.1/countries/cities/q?country=" + encodedCountry;
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .GET()
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response Body:");
        System.out.println(response.body());
    }
}