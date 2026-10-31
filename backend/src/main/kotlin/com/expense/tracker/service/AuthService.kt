package com.expense.tracker.service

import com.expense.tracker.dto.AuthResponse
import com.expense.tracker.dto.LoginRequest
import com.expense.tracker.dto.RegisterRequest
import com.expense.tracker.entity.User
import com.expense.tracker.exception.BadRequestException
import com.expense.tracker.repository.UserRepository
import com.expense.tracker.security.JwtService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) {

    // Register a new user
    fun register(request: RegisterRequest): AuthResponse {
        // Check if email is already taken
        if (userRepository.existsByEmail(request.email)) {
            throw BadRequestException("An account with this email already exists.")
        }

        // Create a new user with BCrypt hashed password
        val user = User(
            name = request.name,
            email = request.email,
            password = passwordEncoder.encode(request.password) // Never store plain text!
        )

        // Save the user to the database
        val savedUser = userRepository.save(user)

        // Generate a JWT token for the new user
        val token = jwtService.generateToken(savedUser.email)

        return AuthResponse(
            token = token,
            userId = savedUser.id,
            name = savedUser.name,
            email = savedUser.email
        )
    }

    // Login an existing user
    fun login(request: LoginRequest): AuthResponse {
        // Find user by email
        val user = userRepository.findByEmail(request.email)
            .orElseThrow { BadRequestException("Invalid email or password.") }

        // Check if the provided password matches the hashed password in database
        if (!passwordEncoder.matches(request.password, user.password)) {
            throw BadRequestException("Invalid email or password.")
        }

        // Generate and return JWT token
        val token = jwtService.generateToken(user.email)

        return AuthResponse(
            token = token,
            userId = user.id,
            name = user.name,
            email = user.email
        )
    }
}
