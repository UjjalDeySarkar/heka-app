package com.rfheka.rfheka.service;

import com.rfheka.rfheka.dto.*;
import com.rfheka.rfheka.entity.User;
import com.rfheka.rfheka.repository.UserRepository;
import com.rfheka.rfheka.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public ApiResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new ApiResponse("Email already registered!", false, null);
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
        return new ApiResponse("User registered successfully!", true, null);
    }

    // Registration already exists
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Pass both email and name to JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getName());
        return new LoginResponse("Login successful", token, user.getName());
    }

    public ApiResponse forgotPassword(ForgotPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return new ApiResponse("User not found with this email.", false, null);
        }

        User user = userOptional.get();
        String otp = generateOtp();
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        userRepository.save(user);

        emailService.sendEmail(user.getEmail(), "Password Reset OTP", "Your OTP is: " + otp);

        return new ApiResponse("OTP sent to your email.", true, null);
    }

    public ApiResponse verifyOtp(VerifyOtpRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return new ApiResponse("User not found.", false, null);
        }

        User user = userOptional.get();
        if (user.getOtp() == null || !user.getOtp().equals(request.getOtp())) {
            return new ApiResponse("Invalid OTP.", false, null);
        }

        if (Duration.between(user.getOtpGeneratedTime(), LocalDateTime.now()).toMinutes() > 5) {
            return new ApiResponse("OTP has expired.", false, null);
        }

        user.setOtp(null);
        user.setOtpGeneratedTime(null);
        userRepository.save(user);

        return new ApiResponse("OTP verified successfully.", true, null);
    }

    public ApiResponse resetPassword(ResetPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isEmpty()) {
            return new ApiResponse("User not found.", false, null);
        }

        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return new ApiResponse("Password reset successfully.", true, null);
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}