package com.rfheka.rfheka.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EducationDto {

    @NotBlank
    private String degreeOrClass;      // Class / Degree

    @NotBlank
    private String institute;           // School / Institute

    @NotBlank
    private String boardOrUniversity;   // Board / University

    @NotNull
    private Integer passingYear;

    @NotBlank
    private String marksOrGrade;

    @NotBlank
    private String stream;
}
