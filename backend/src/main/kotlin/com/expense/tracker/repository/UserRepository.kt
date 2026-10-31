package com.expense.tracker.repository

import com.expense.tracker.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional

// JPA Repository for User - Spring creates the SQL queries automatically
interface UserRepository : JpaRepository<User, Long> {

    // Find a user by their email address (used during login)
    fun findByEmail(email: String): Optional<User>

    // Check if an email is already registered (used during registration)
    fun existsByEmail(email: String): Boolean
}
