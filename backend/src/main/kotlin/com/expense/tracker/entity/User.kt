package com.expense.tracker.entity

import jakarta.persistence.*
import java.time.LocalDateTime

// This class maps to the "users" table in MySQL
@Entity
@Table(name = "users")
data class User(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val name: String = "",

    // Email must be unique - no two users can have the same email
    @Column(nullable = false, unique = true)
    val email: String = "",

    // Password stored as BCrypt hash, never plain text
    @Column(nullable = false)
    val password: String = "",

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)
