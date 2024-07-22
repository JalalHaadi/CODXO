document.addEventListener('DOMContentLoaded', () => {
    const expenseDescriptionInput = document.getElementById('expense-description');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseDateInput = document.getElementById('expense-date');
    const addExpenseButton = document.getElementById('add-expense');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const filterSelect = document.getElementById('filter');
    const filterValueInput = document.getElementById('filter-value');
    const applyFilterButton = document.getElementById('apply-filter');

    let expenses = [];
    let total = 0;

    addExpenseButton.addEventListener('click', () => {
        const description = expenseDescriptionInput.value;
        const amount = parseFloat(expenseAmountInput.value);
        const date = expenseDateInput.value;

        if (description && amount && date) {
            const expense = { description, amount, date };
            expenses.push(expense);

            addExpenseToDOM(expense);
            updateTotal(amount);

            expenseDescriptionInput.value = '';
            expenseAmountInput.value = '';
            expenseDateInput.value = '';
        }
    });

    applyFilterButton.addEventListener('click', () => {
        const filterBy = filterSelect.value;
        const filterValue = filterValueInput.value.toLowerCase();

        const filteredExpenses = expenses.filter(expense => {
            if (filterBy === 'all') {
                return true;
            } else if (filterBy === 'date') {
                return expense.date.includes(filterValue);
            } else if (filterBy === 'amount') {
                return expense.amount == filterValue;
            } else if (filterBy === 'description') {
                return expense.description.toLowerCase().includes(filterValue);
            }
        });

        displayFilteredExpenses(filteredExpenses);
    });

    function addExpenseToDOM(expense) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${expense.date} - ${expense.description}</span>
            <span>₹${expense.amount.toFixed(2)}</span>
            <button class="delete-button">Delete</button>
        `;
        expenseList.appendChild(listItem);

        listItem.querySelector('.delete-button').addEventListener('click', () => {
            total -= expense.amount;
            totalAmount.textContent = total.toFixed(2);
            expenseList.removeChild(listItem);
            expenses = expenses.filter(e => e !== expense);
        });
    }

    function updateTotal(amount) {
        total += amount;
        totalAmount.textContent = total.toFixed(2);
    }

    function displayFilteredExpenses(filteredExpenses) {
        expenseList.innerHTML = '';
        total = 0;

        filteredExpenses.forEach(expense => {
            addExpenseToDOM(expense);
            total += expense.amount;
        });

        totalAmount.textContent = total.toFixed(2);
    }
});
