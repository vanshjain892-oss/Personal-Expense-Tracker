# Product Requirements Document (PRD)

# Personal Expense Tracker for Effective Financial Management

## 1. Project Overview

Personal Expense Tracker for Effective Financial Management is a simple web-based financial management application designed to help users record, organize, and monitor their daily income and expenses.

The application allows users to securely register and log in, add income and expenses, categorize expenses, view transaction history, monitor their remaining balance, and understand their spending patterns.

The project is developed as a college academic project and should have a clean, simple, realistic student-project appearance rather than looking like a commercial SaaS product.

---

## 2. Academic Information

### Project Title

Personal Expense Tracker for Effective Financial Management

### Sustainable Development Goal

SDG 8: Decent Work and Economic Growth

### SDG Target

Target 8.10: Promote access to financial services and financial inclusion.

### Project Purpose

The project promotes basic financial awareness and financial inclusion by providing users with an accessible digital tool to record income, track expenses, categorize spending, monitor their balance, and make better financial decisions.

---

# 3. Problem Statement

Many students and individuals do not properly track their daily income and expenses. Manual records can be difficult to maintain and may not provide a clear understanding of spending patterns.

The proposed system provides a simple digital solution where users can record financial transactions and view useful summaries from a single dashboard.

---

# 4. Project Objectives

The application must satisfy the following objectives:

1. To record and manage daily income and expenses easily.
2. To categorize expenses such as food, travel, shopping, bills, education, and other categories.
3. To help users track their spending habits and manage their budget.
4. To provide a secure login system for protecting financial data.
5. To display expense summaries and remaining balance for better financial planning.

---

# 5. Target Users

The primary target users are:

- College students
- Young professionals
- Individuals who want to track personal finances
- Users who want a simple budgeting tool

The first version should focus on individual users rather than businesses or organizations.

---

# 6. Core Features

## 6.1 User Registration

Users should be able to create an account using:

- Full name
- Email
- Password

Validation should be provided for all required fields.

---

## 6.2 User Login

Users should be able to log in using:

- Email
- Password

The backend must authenticate the user and provide a JWT token after successful login.

Incorrect credentials should show a clear error message.

---

## 6.3 Dashboard

After login, the user should see a dashboard containing:

- Total income
- Total expenses
- Remaining balance
- Number of transactions
- Recent transactions
- Expense category summary

Balance should be calculated as:

Balance = Total Income - Total Expenses

---

## 6.4 Add Income

Users should be able to add income with:

- Income title/source
- Amount
- Date
- Optional note

Example:

Source: Part-time Work
Amount: ₹5000
Date: 07/10/2026

---

## 6.5 Add Expense

Users should be able to add expenses with:

- Expense title
- Amount
- Category
- Date
- Optional note

Default categories:

- Food
- Travel
- Shopping
- Bills
- Education
- Entertainment
- Health
- Other

---

## 6.6 Edit Transaction

Users should be able to edit their own income and expense records.

The edit form should allow modification of:

- Title/source
- Amount
- Category
- Date
- Note

---

## 6.7 Delete Transaction

Users should be able to delete their own transactions.

Before deletion, show a simple confirmation message.

---

## 6.8 Transaction History

Create a transaction page containing a table/list with:

- Date
- Type
- Title
- Category
- Amount
- Actions

Actions:

- Edit
- Delete

Income and expenses should be visually distinguishable.

---

## 6.9 Expense Filtering

Users should be able to filter expenses by:

- Category
- Date
- Transaction type

Example:

All
Food
Travel
Shopping
Bills
Education
Other

---

## 6.10 Search

Users should be able to search transactions by title/source.

Example:

Searching "Lunch" should show transactions containing "Lunch".

---

## 6.11 Expense Summary

The dashboard should show a simple category-based expense summary.

Example:

Food: ₹4,500
Travel: ₹2,000
Shopping: ₹3,500
Bills: ₹5,000

The summary can be represented using simple cards or a basic chart.

Do not create unnecessarily complicated visualizations.

---

## 6.12 Remaining Balance

The dashboard must clearly display:

Total Income
minus
Total Expenses
equals
Remaining Balance

Example:

Income: ₹30,000
Expenses: ₹18,000
Balance: ₹12,000

---

# 7. Budget Feature

Include a simple monthly budget feature.

Users should be able to set a monthly budget.

Example:

Monthly Budget: ₹20,000

The dashboard should show:

Budget
Amount Spent
Amount Remaining

If spending exceeds the budget, display a simple warning.

Do not implement complicated financial forecasting.

---

# 8. Authentication and Security

Authentication must use JWT.

Requirements:

- Passwords must never be stored as plain text.
- Passwords should be securely hashed using BCrypt.
- JWT should be generated after successful login.
- Protected API endpoints must require authentication.
- A user must only be able to access their own transactions.
- Unauthorized requests should return an appropriate HTTP status.

---

# 9. Data Model

## User

Fields:

- id
- name
- email
- password

---

## Expense

Fields:

- id
- title
- amount
- category
- date
- note
- userId
- createdAt

---

## Income

Fields:

- id
- source
- amount
- date
- note
- userId
- createdAt

---

## Budget

Fields:

- id
- amount
- month
- year
- userId

---

# 10. API Requirements

The backend should provide REST APIs.

## Authentication APIs

POST /api/auth/register

POST /api/auth/login

---

## Expense APIs

GET /api/expenses

GET /api/expenses/{id}

POST /api/expenses

PUT /api/expenses/{id}

DELETE /api/expenses/{id}

---

## Income APIs

GET /api/income

GET /api/income/{id}

POST /api/income

PUT /api/income/{id}

DELETE /api/income/{id}

---

## Budget APIs

GET /api/budget

POST /api/budget

PUT /api/budget

---

# 11. Frontend Pages

The frontend should contain the following pages:

1. Login
2. Register
3. Dashboard
4. Transactions
5. Add Expense
6. Add Income
7. Edit Transaction
8. Budget

The application should use React Router for navigation.

---

# 12. React Components

Use reusable React components such as:

- Navbar
- Sidebar or simple navigation
- SummaryCard
- ExpenseForm
- IncomeForm
- TransactionTable
- TransactionRow
- CategoryFilter
- SearchBar
- BudgetCard
- ProtectedRoute
- ErrorMessage
- LoadingSpinner

Do not create unnecessary components for very small pieces of UI.

---

# 13. Validation Requirements

Frontend validation:

- Required fields must not be empty.
- Amount must be greater than zero.
- Email must have a valid format.
- Password must have a reasonable minimum length.
- Date must be valid.

Backend validation must also be implemented.

Frontend validation must never be treated as the only security mechanism.

---

# 14. Error Handling

The application should handle:

- Invalid login
- Duplicate email
- Missing required fields
- Invalid amount
- Transaction not found
- Unauthorized access
- Server errors
- Database errors
- Network errors

Use simple understandable error messages.

Example:

"Invalid email or password."

"Amount must be greater than zero."

"Transaction not found."

---

# 15. User Experience

The application should be:

- Simple
- Clean
- Responsive
- Beginner-friendly
- Easy to navigate
- Fast enough for normal college-project usage

The interface should not look overly complicated.

---

# 16. Academic Requirements

The implementation should support demonstration of the following experiments:

### Experiment 1
REST API architecture and CRUD operations using Postman.

### Experiment 2
React components and JSX.

### Experiment 3
React state management using Hooks, Context or simple state management.

### Experiment 4
Kotlin programming and OOP concepts.

### Experiment 5
Kotlin exception handling and collection operations.

### Experiment 6
Spring Boot REST API and CRUD operations.

### Experiment 7
Hibernate/JPA database integration and CRUD.

### Experiment 8
JWT authentication and testing using Postman.

Experiments involving microservices, cloud deployment and Flutter are not required for the first version.

---

# 17. Non-Functional Requirements

## Performance

The application should respond quickly under normal student-project usage.

## Security

User passwords must be hashed.

Protected APIs must require JWT authentication.

Users must not access other users' financial records.

## Maintainability

Code should be organized into logical folders.

## Usability

A new user should be able to understand the application without instructions.

---

# 18. Out of Scope

Do NOT implement:

- Banking API integration
- Real bank account connections
- Payment gateway
- Stock market integration
- Cryptocurrency
- AI financial advisor
- Complex financial predictions
- Multi-user shared wallets
- Microservices
- Mobile application
- Complex cloud infrastructure

These features are unnecessary for the academic project.

---

# 19. Definition of Done

The project will be considered complete when:

1. User can register.
2. User can log in.
3. JWT authentication works.
4. User can add income.
5. User can add expenses.
6. User can edit transactions.
7. User can delete transactions.
8. User can filter transactions.
9. User can search transactions.
10. Dashboard shows total income.
11. Dashboard shows total expenses.
12. Dashboard shows remaining balance.
13. Category summaries are displayed.
14. Monthly budget can be set.
15. Data is stored in MySQL.
16. Backend APIs work through Postman.
17. Unauthorized users cannot access protected data.
18. Application is responsive.
19. UI is simple and human-made.
20. Code is understandable enough for a college demonstration.

---

# 20. Development Philosophy

This is a college student project.

Prioritize:

- Simplicity
- Understandability
- Working functionality
- Clean code
- Easy demonstration
- Easy modification

Avoid unnecessary complexity.

Do not over-engineer the application.