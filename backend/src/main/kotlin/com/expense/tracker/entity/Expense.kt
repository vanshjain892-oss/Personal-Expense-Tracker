package com.expense.tracker.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime

// This class maps to the "expenses" table in MySQL
@Entity
@Table(name = "expenses")
data class Expense(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val title: String = "",

    @Column(nullable = false, precision = 10, scale = 2)
    val amount: BigDecimal = BigDecimal.ZERO,

    @Column(nullable = false)
    val category: String = "",

    @Column(nullable = false)
    val date: LocalDate = LocalDate.now(),

    // Note is optional
    val note: String? = null,

    // Each expense belongs to a specific user (many expenses to one user)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User = User(),

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)
