package com.expense.tracker.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal
import java.time.LocalDate

// Data class for creating or updating an income record
data class IncomeRequest(
    @field:NotBlank(message = "Income source is required")
    val source: String,

    @field:NotNull(message = "Amount is required")
    @field:DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    val amount: BigDecimal,

    @field:NotNull(message = "Date is required")
    val date: LocalDate,

    // Note is optional
    val note: String? = null
)

// Data class for sending income data back to the frontend
data class IncomeResponse(
    val id: Long,
    val source: String,
    val amount: BigDecimal,
    val date: LocalDate,
    val note: String?,
    val createdAt: String
)
