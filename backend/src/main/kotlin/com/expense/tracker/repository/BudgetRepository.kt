package com.expense.tracker.repository

import com.expense.tracker.entity.Budget
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional

// JPA Repository for Budget
interface BudgetRepository : JpaRepository<Budget, Long> {

    // Get budget for a specific user, month, and year
    fun findByUserIdAndMonthAndYear(userId: Long, month: Int, year: Int): Optional<Budget>

    // Get all budgets for a user
    fun findByUserId(userId: Long): List<Budget>
}
