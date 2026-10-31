package com.expense.tracker.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.Date
import javax.crypto.SecretKey

// This service handles all JWT operations: create, validate, and read tokens
@Service
class JwtService {

    // Load secret key and expiration from application.properties
    @Value("\${jwt.secret}")
    private lateinit var secretString: String

    @Value("\${jwt.expiration}")
    private var expirationMs: Long = 86400000

    // Convert the secret string into a cryptographic key
    private fun getSigningKey(): SecretKey {
        return Keys.hmacShaKeyFor(secretString.toByteArray())
    }

    // Create a JWT token for a given email (called after successful login)
    fun generateToken(email: String): String {
        return Jwts.builder()
            .subject(email)
            .issuedAt(Date())
            .expiration(Date(System.currentTimeMillis() + expirationMs))
            .signWith(getSigningKey())
            .compact()
    }

    // Extract the email (subject) from a JWT token
    fun extractEmail(token: String): String {
        return extractClaims(token).subject
    }

    // Check if a token is still valid (not expired)
    fun isTokenValid(token: String): Boolean {
        return try {
            val claims = extractClaims(token)
            claims.expiration.after(Date())
        } catch (e: Exception) {
            false
        }
    }

    // Internal helper to parse and extract all claims from a token
    private fun extractClaims(token: String): Claims {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .payload
    }
}
