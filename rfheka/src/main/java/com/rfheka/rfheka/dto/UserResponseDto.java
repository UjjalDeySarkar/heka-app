package com.rfheka.rfheka.dto;

import com.rfheka.rfheka.entity.UserType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto {

    private Long id;
    private String name;
    private String email;
    private UserType userType;
}
