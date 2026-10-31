package com.expense.tracker.controller

import com.expense.tracker.dto.LoginRequest
import com.expense.tracker.dto.RegisterRequest
import com.expense.tracker.service.AuthService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

// Handles /api/auth/register and /api/auth/login
@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    // POST /api/auth/register
    @PostMapping("/register")
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<Any> {
        val response = authService.register(request)
        return ResponseEntity(response, HttpStatus.CREATED)
    }

    // POST /api/auth/login
    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<Any> {
        val response = authService.login(request)
        return ResponseEntity.ok(response)
    }
}
