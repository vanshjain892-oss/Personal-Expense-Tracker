package com.expense.tracker.service

import com.expense.tracker.dto.BudgetRequest
import com.expense.tracker.dto.BudgetResponse
import com.expense.tracker.entity.Budget
import com.expense.tracker.exception.ResourceNotFoundException
import com.expense.tracker.repository.BudgetRepository
import com.expense.tracker.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class BudgetService(
    private val budgetRepository: BudgetRepository,
    private val userRepository: UserRepository
) {

    // Get the budget for a specific month and year
    fun getBudget(month: Int, year: Int, userEmail: String): BudgetResponse? {
        val user = findUserByEmail(userEmail)
        val budget = budgetRepository.findByUserIdAndMonthAndYear(user.id, month, year)
        return budget.map { it.toResponse() }.orElse(null)
    }

    // Set or update a monthly budget
    fun setBudget(request: BudgetRequest, userEmail: String): BudgetResponse {
        val user = findUserByEmail(userEmail)

        // Check if a budget already exists for this month/year
        val existingBudget = budgetRepository.findByUserIdAndMonthAndYear(
            user.id, request.month, request.year
        )

        val budget = if (existingBudget.isPresent) {
            // Update existing budget
            existingBudget.get().copy(amount = request.amount)
        } else {
            // Create new budget
            Budget(
                amount = request.amount,
                month = request.month,
                year = request.year,
                user = user
            )
        }

        return budgetRepository.save(budget).toResponse()
    }

    private fun findUserByEmail(email: String) =
        userRepository.findByEmail(email)
            .orElseThrow { ResourceNotFoundException("User not found.") }

    private fun Budget.toResponse() = BudgetResponse(
        id = id,
        amount = amount,
        month = month,
        year = year
    )
}
