package com.rfheka.rfheka.dto;

import com.rfheka.rfheka.entity.CourseType;
import lombok.Data;

import java.util.List;

@Data
public class CoachingCenterCreateRequest {

    private String name;
    private String address;
    private String contactNumber;

    private List<CourseFeeDto> courses;
}
