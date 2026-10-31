package com.expense.tracker.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal
import java.time.LocalDate

// Data class for creating or updating an expense
data class ExpenseRequest(
    @field:NotBlank(message = "Title is required")
    val title: String,

    @field:NotNull(message = "Amount is required")
    @field:DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    val amount: BigDecimal,

    @field:NotBlank(message = "Category is required")
    val category: String,

    @field:NotNull(message = "Date is required")
    val date: LocalDate,

    // Note is optional
    val note: String? = null
)

// Data class for sending expense data back to the frontend
data class ExpenseResponse(
    val id: Long,
    val title: String,
    val amount: BigDecimal,
    val category: String,
    val date: LocalDate,
    val note: String?,
    val createdAt: String
)
