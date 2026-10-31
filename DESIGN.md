# UI/UX Design Specification

# Personal Expense Tracker for Effective Financial Management

## 1. Design Goal

Create a clean, simple and realistic college-project web application.

The design should look like a project created by a third-year engineering student.

It should be professional enough for academic evaluation but should NOT look like an expensive commercial SaaS template.

---

# 2. Design Principles

Follow these principles:

1. Simple
2. Clean
3. Easy to understand
4. Easy to navigate
5. Responsive
6. Minimal animations
7. Consistent spacing
8. Clear typography
9. Strong readability
10. Beginner-friendly UI

---

# 3. Visual Style

Use a modern but simple dashboard style.

Recommended:

- White or very light background
- Dark text
- One primary accent color
- Light borders
- Rounded cards
- Simple shadows
- Normal buttons
- Clean tables

Do not use excessive visual effects.

---

# 4. Color System

Use a small color palette.

Primary:

#2563EB

Used for:

- Main buttons
- Active navigation
- Important actions

Success:

#16A34A

Used for:

- Income
- Positive balance
- Success messages

Danger:

#DC2626

Used for:

- Expenses where appropriate
- Delete button
- Error messages

Warning:

#F59E0B

Used for:

- Budget warnings

Background:

#F8FAFC

Cards:

#FFFFFF

Text:

#1E293B

Secondary text:

#64748B

Border:

#E2E8F0

Do not introduce many additional colors.

---

# 5. Typography

Use a clean sans-serif font.

Preferred:

Inter

Fallback:

Arial, sans-serif

Use:

- Large heading for page titles
- Medium heading for sections
- Normal body text
- Smaller muted text for secondary information

Avoid decorative fonts.

---

# 6. Layout

Desktop layout:

------------------------------------------------
| Logo | Dashboard | Transactions | Budget | Logout |
------------------------------------------------

|              Main Content                    |
|                                               |
|  Welcome back                                |
|                                               |
|  [Income] [Expenses] [Balance] [Budget]      |
|                                               |
|  Recent Transactions                          |
|  -------------------------------------------  |
|  Date | Title | Category | Amount | Actions |
|                                               |
------------------------------------------------

---

# 7. Login Page

The login page should be simple.

Structure:

-------------------------------------
       Smart Expense Tracker

       Welcome Back

Email
[____________________________]

Password
[____________________________]

[          Login             ]

Don't have an account?
Create Account
-------------------------------------

Do not use complicated illustrations.

---

# 8. Register Page

Fields:

Full Name

Email

Password

Confirm Password

Button:

Create Account

Link:

Already have an account? Login

---

# 9. Dashboard

Dashboard should be the main page after login.

Top:

Welcome back, [User Name]

Summary cards:

-----------------------------------------------
| Total Income | Total Expenses | Balance |
| ₹30,000      | ₹18,000         | ₹12,000 |
-----------------------------------------------

Second row:

-----------------------------------------------
| Monthly Budget | Spent | Remaining |
-----------------------------------------------

Below:

Recent Transactions

-----------------------------------------------
| Date | Title | Category | Amount | Action |
-----------------------------------------------

Then:

Expense Categories

Food
₹4,500

Travel
₹2,000

Shopping
₹3,500

Bills
₹5,000

---

# 10. Summary Cards

Each card should contain:

Small label

Large amount

Optional small supporting text

Example:

TOTAL EXPENSES

₹18,500

This Month

Keep cards simple.

---

# 11. Add Expense Form

Page title:

Add Expense

Fields:

Expense Title
[________________]

Amount
[________________]

Category
[ Select Category ▼ ]

Date
[________________]

Note
[____________________________]

[ Add Expense ]

Use a normal form layout.

Validation errors should appear below the relevant field.

---

# 12. Add Income Form

Page title:

Add Income

Fields:

Income Source

Amount

Date

Note

Button:

Add Income

---

# 13. Transactions Page

Page title:

Transactions

Top controls:

[ Search transactions ]

[ All ▼ ]

[ Category ▼ ]

[ Date ]

Transaction table:

--------------------------------------------------------
Date       Title       Type       Category     Amount
--------------------------------------------------------
07 Oct     Lunch       Expense    Food         ₹250
06 Oct     Salary      Income     Salary       ₹30,000
05 Oct     Bus Pass    Expense    Travel       ₹500
--------------------------------------------------------

Actions:

Edit
Delete

---

# 14. Transaction Colors

Use subtle visual distinction.

Income:

Green text or indicator

Expense:

Red text or indicator

Do not make the entire row bright red or green.

---

# 15. Budget Page

Page title:

Monthly Budget

Show:

Current Budget
₹20,000

Amount Spent
₹15,500

Remaining
₹4,500

Progress indicator:

[██████████████------]

Button:

Set / Update Budget

If spending exceeds the budget:

Budget exceeded

Use a simple warning message.

---

# 16. Navigation

Desktop navigation:

Logo

Dashboard
Transactions
Add Expense
Add Income
Budget

Logout

Mobile:

Use a simple responsive navigation or menu.

Do not build an overly complicated sidebar.

---

# 17. Buttons

Primary button:

[ Add Expense ]

Secondary:

[ Cancel ]

Danger:

[ Delete ]

Buttons should:

- Have reasonable padding
- Have rounded corners
- Have hover effect
- Be easy to click

Avoid excessive animations.

---

# 18. Forms

All forms should:

- Have clear labels
- Have consistent spacing
- Show validation errors
- Use readable inputs
- Have clear submit buttons

Input examples:

[ Enter expense title ]

[ Enter amount ]

[ Select category ]

---

# 19. Empty States

If the user has no transactions:

Show:

No transactions yet.

Start by adding your first income or expense.

[ Add Expense ]

This is better than displaying an empty table.

---

# 20. Loading States

When loading data:

Show a simple:

Loading...

or small spinner.

Do not create complex loading animations.

---

# 21. Error States

Display clear messages.

Examples:

Unable to load transactions.

Invalid email or password.

Please enter a valid amount.

Something went wrong. Please try again.

---

# 22. Responsive Design

The application must work on:

- Desktop
- Laptop
- Tablet
- Mobile

Desktop:

Use multiple cards in a row.

Mobile:

Cards should stack vertically.

Tables should become horizontally scrollable or use a mobile-friendly card layout.

---

# 23. Charts

Use at most one simple chart on the dashboard.

Recommended:

Expense category chart.

Example categories:

Food
Travel
Shopping
Bills
Education
Other

Do not create multiple complicated charts.

A simple CSS-based visualization is acceptable if a chart library is unnecessary.

---

# 24. Animations

Use minimal animations only.

Allowed:

- Button hover
- Small card hover
- Smooth transitions

Avoid:

- Large page animations
- Floating objects
- Excessive motion
- Particle effects
- 3D effects

---

# 25. Human-Made Student Project Appearance

This requirement is important.

The website should look like a well-made engineering college project.

It should NOT look like:

- A commercial banking website
- A cryptocurrency dashboard
- An AI-generated futuristic website
- A premium SaaS template

Prefer:

- Simple cards
- Simple forms
- Normal navigation
- Clear tables
- Basic charts
- Moderate spacing
- Limited colors

---

# 26. Accessibility

Use:

- Proper labels
- Semantic HTML
- Keyboard-friendly forms
- Sufficient text contrast
- Meaningful button names

Example:

Good:

[ Add Expense ]

Bad:

[ + ]

unless the meaning is already obvious.

---

# 27. Demo-Friendly Design

The UI must make it easy to demonstrate the following actions:

1. Register a user.
2. Login.
3. Add income.
4. Add expense.
5. Select a category.
6. Edit an expense.
7. Delete an expense.
8. Filter expenses.
9. Search transactions.
10. Set monthly budget.
11. Show dashboard totals.
12. Show remaining balance.
13. Logout.
14. Login again.

These actions should be obvious from the interface.

---

# 28. Final UI Flow

User opens application

↓

Login / Register

↓

Dashboard

↓

Add Income / Add Expense

↓

Transaction saved

↓

Dashboard updates

↓

User can view/filter/edit/delete transactions

↓

Budget can be set

↓

Dashboard displays:

Income
Expenses
Balance
Budget
Category Summary

↓

Logout

---

# 29. Final Design Rule

Do not add features simply to make the project look impressive.

Every feature should support the project objectives.

The final application should prioritize:

Working functionality > visual complexity

Understandability > clever code

Simple design > excessive design

Academic demonstration > unnecessary features