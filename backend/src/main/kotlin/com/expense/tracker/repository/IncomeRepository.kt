package com.expense.tracker.repository

import com.expense.tracker.entity.Income
import org.springframework.data.jpa.repository.JpaRepository

// JPA Repository for Income - provides database CRUD operations
interface IncomeRepository : JpaRepository<Income, Long> {

    // Get all income records belonging to a specific user
    fun findByUserId(userId: Long): List<Income>
}
