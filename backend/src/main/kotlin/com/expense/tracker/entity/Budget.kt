package com.expense.tracker.entity

import jakarta.persistence.*
import java.math.BigDecimal

// This class maps to the "budgets" table in MySQL
@Entity
@Table(name = "budgets")
data class Budget(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    // Monthly budget amount set by user
    @Column(nullable = false, precision = 10, scale = 2)
    val amount: BigDecimal = BigDecimal.ZERO,

    // Month (1-12) and year (e.g., 2026)
    @Column(nullable = false)
    val month: Int = 0,

    @Column(nullable = false)
    val year: Int = 0,

    // Each budget belongs to a specific user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User = User()
)
