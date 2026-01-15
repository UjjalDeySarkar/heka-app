package com.rfheka.rfheka.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String otp;
    private LocalDateTime otpGeneratedTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private UserType userType = UserType.NORMAL;
}