package com.ine.backend.dto;


// CompanyFiltersDTO.java
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CompanyFiltersDTO {
    private String industry;
    private String location;
    private String minAlumni;
    private boolean hasEmail;
    private boolean hasNumber;
}