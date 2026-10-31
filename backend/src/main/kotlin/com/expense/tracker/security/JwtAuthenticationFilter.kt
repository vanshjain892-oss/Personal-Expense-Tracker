package com.expense.tracker.security

import com.expense.tracker.repository.UserRepository
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

// This filter runs on every HTTP request
// It checks if there is a valid JWT token in the Authorization header
@Component
class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val userRepository: UserRepository
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        // Read the Authorization header
        val authHeader = request.getHeader("Authorization")

        // If no token or wrong format, continue without authentication
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response)
            return
        }

        // Extract the token (remove "Bearer " prefix)
        val token = authHeader.substring(7)

        // Validate the token and extract the email
        if (!jwtService.isTokenValid(token)) {
            filterChain.doFilter(request, response)
            return
        }

        val email = jwtService.extractEmail(token)

        // If the user is not already authenticated in this request
        if (SecurityContextHolder.getContext().authentication == null) {
            // Find the user in the database
            val userEntity = userRepository.findByEmail(email).orElse(null)

            if (userEntity != null) {
                // Create a Spring Security user object
                val userDetails = User.builder()
                    .username(userEntity.email)
                    .password(userEntity.password)
                    .roles("USER")
                    .build()

                // Set the user as authenticated in Spring Security context
                val authToken = UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.authorities
                )
                authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                SecurityContextHolder.getContext().authentication = authToken
            }
        }

        filterChain.doFilter(request, response)
    }
}
