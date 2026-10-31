package com.expense.tracker.controller

import com.expense.tracker.dto.IncomeRequest
import com.expense.tracker.service.IncomeService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*

// Handles all /api/income endpoints
@RestController
@RequestMapping("/api/income")
class IncomeController(private val incomeService: IncomeService) {

    // GET /api/income
    @GetMapping
    fun getAllIncome(@AuthenticationPrincipal user: UserDetails): ResponseEntity<Any> {
        val income = incomeService.getAllIncome(user.username)
        return ResponseEntity.ok(income)
    }

    // GET /api/income/{id}
    @GetMapping("/{id}")
    fun getIncomeById(
        @PathVariable id: Long,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val income = incomeService.getIncomeById(id, user.username)
        return ResponseEntity.ok(income)
    }

    // POST /api/income
    @PostMapping
    fun createIncome(
        @Valid @RequestBody request: IncomeRequest,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val income = incomeService.createIncome(request, user.username)
        return ResponseEntity(income, HttpStatus.CREATED)
    }

    // PUT /api/income/{id}
    @PutMapping("/{id}")
    fun updateIncome(
        @PathVariable id: Long,
        @Valid @RequestBody request: IncomeRequest,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        val income = incomeService.updateIncome(id, request, user.username)
        return ResponseEntity.ok(income)
    }

    // DELETE /api/income/{id}
    @DeleteMapping("/{id}")
    fun deleteIncome(
        @PathVariable id: Long,
        @AuthenticationPrincipal user: UserDetails
    ): ResponseEntity<Any> {
        incomeService.deleteIncome(id, user.username)
        return ResponseEntity.ok(mapOf("message" to "Income record deleted successfully."))
    }
}
