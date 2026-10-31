package com.expense.tracker.controller

import com.expense.tracker.dto.BudgetRequest
import com.expense.tracker.service.BudgetService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*

// Handles /api/budget endpoints
@RestController
@RequestMapping("/api/budget")
class BudgetController(private val budgetService: BudgetService) {

    // GET /api/budget?month=10&year=2026
    @GetMapping
    fun getBudget(
        @RequestParam month: Int,
        @RequestParam year: Int,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val budget = budgetService.getBudget(month, year, user.username)
        return if (budget != null) {
            ResponseEntity.ok(budget)
        } else {
            ResponseEntity.ok(mapOf("message" to "No budget set for this month."))
        }
    }

    // POST /api/budget - create or update monthly budget
    @PostMapping
    fun setBudget(
        @Valid @RequestBody request: BudgetRequest,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val budget = budgetService.setBudget(request, user.username)
        return ResponseEntity.ok(budget)
    }

    // PUT /api/budget - same as POST (create or update)
    @PutMapping
    fun updateBudget(
        @Valid @RequestBody request: BudgetRequest,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val budget = budgetService.setBudget(request, user.username)
        return ResponseEntity.ok(budget)
    }
}
