package com.rfheka.rfheka.controller;

import com.rfheka.rfheka.dto.ApiResponse;
import com.rfheka.rfheka.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers() {

        return ResponseEntity.ok(
                new ApiResponse(
                        "Users fetched successfully",
                        true,
                        userService.getAllUsers()
                )
        );
    }
}
