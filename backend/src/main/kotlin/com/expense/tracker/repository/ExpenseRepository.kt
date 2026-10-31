package com.expense.tracker.repository

import com.expense.tracker.entity.Expense
import org.springframework.data.jpa.repository.JpaRepository
import java.time.LocalDate

// JPA Repository for Expense - provides database CRUD operations
interface ExpenseRepository : JpaRepository<Expense, Long> {

    // Get all expenses belonging to a specific user
    fun findByUserId(userId: Long): List<Expense>

    // Get expenses within a date range for a specific user
    fun findByUserIdAndDateBetween(userId: Long, startDate: LocalDate, endDate: LocalDate): List<Expense>

    // Get expenses by category for a specific user
    fun findByUserIdAndCategory(userId: Long, category: String): List<Expense>
}
