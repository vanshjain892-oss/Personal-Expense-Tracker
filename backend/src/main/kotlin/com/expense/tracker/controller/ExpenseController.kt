package com.expense.tracker.controller

import com.expense.tracker.dto.ExpenseRequest
import com.expense.tracker.service.ExpenseService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*

// Handles all /api/expenses endpoints
// @AuthenticationPrincipal gives us the currently logged-in user's details
@RestController
@RequestMapping("/api/expenses")
class ExpenseController(private val expenseService: ExpenseService) {

    // GET /api/expenses - get all expenses for logged-in user
    @GetMapping
    fun getAllExpenses(@AuthenticationPrincipal user: UserDetails): ResponseEntity<Any> {
        val expenses = expenseService.getAllExpenses(user.username)
        return ResponseEntity.ok(expenses)
    }

    // GET /api/expenses/{id} - get one expense by ID
    @GetMapping("/{id}")
    fun getExpenseById(
        @PathVariable id: Long,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val expense = expenseService.getExpenseById(id, user.username)
        return ResponseEntity.ok(expense)
    }

    // POST /api/expenses - create a new expense
    @PostMapping
    fun createExpense(
        @Valid @RequestBody request: ExpenseRequest,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val expense = expenseService.createExpense(request, user.username)
        return ResponseEntity(expense, HttpStatus.CREATED)
    }

    // PUT /api/expenses/{id} - update an existing expense
    @PutMapping("/{id}")
    fun updateExpense(
        @PathVariable id: Long,
        @Valid @RequestBody request: ExpenseRequest,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val expense = expenseService.updateExpense(id, request, user.username)
        return ResponseEntity.ok(expense)
    }

    // DELETE /api/expenses/{id} - delete an expense
    @DeleteMapping("/{id}")
    fun deleteExpense(
        @PathVariable id: Long,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        expenseService.deleteExpense(id, user.username)
        return ResponseEntity.ok(mapOf("message" to "Expense deleted successfully."))
    }
}
