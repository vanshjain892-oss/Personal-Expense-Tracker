package com.expense.tracker.entity

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime

// This class maps to the "income" table in MySQL
@Entity
@Table(name = "income")
data class Income(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    // "source" is the income source/title (e.g., "Part-time Work", "Salary")
    @Column(nullable = false)
    val source: String = "",

    @Column(nullable = false, precision = 10, scale = 2)
    val amount: BigDecimal = BigDecimal.ZERO,

    @Column(nullable = false)
    val date: LocalDate = LocalDate.now(),

    // Note is optional
    val note: String? = null,

    // Each income record belongs to a specific user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User = User(),

    @Column(nullable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)
