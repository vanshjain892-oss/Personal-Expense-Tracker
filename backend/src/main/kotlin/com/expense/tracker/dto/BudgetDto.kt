package com.expense.tracker.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

// Data class for setting a monthly budget
data class BudgetRequest(
    @field:NotNull(message = "Amount is required")
    @field:DecimalMin(value = "0.01", message = "Budget must be greater than zero")
    val amount: BigDecimal,

    @field:NotNull(message = "Month is required")
    val month: Int,

    @field:NotNull(message = "Year is required")
    val year: Int
)

// Data class for sending budget data back to the frontend
data class BudgetResponse(
    val id: Long,
    val amount: BigDecimal,
    val month: Int,
    val year: Int
)
