package com.rfheka.rfheka.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class WorkExperienceDto {

    @NotBlank
    private String companyName;

    @NotBlank
    private String designation;

    @NotBlank
    private String reportingPerson;

    @NotBlank
    private String reportingContact;

    @NotBlank
    private String jobResponsibilities;
}
