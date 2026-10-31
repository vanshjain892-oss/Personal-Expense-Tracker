package com.expense.tracker.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

// Data class for login request body
data class LoginRequest(
    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Please enter a valid email")
    val email: String,

    @field:NotBlank(message = "Password is required")
    val password: String
)

// Data class for register request body
data class RegisterRequest(
    @field:NotBlank(message = "Name is required")
    val name: String,

    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Please enter a valid email")
    val email: String,

    @field:NotBlank(message = "Password is required")
    @field:Size(min = 6, message = "Password must be at least 6 characters")
    val password: String
)

// Data class for sending auth response back to the frontend
data class AuthResponse(
    val token: String,
    val userId: Long,
    val name: String,
    val email: String
)
