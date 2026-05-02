import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm from "./ExpenseForm";
import categories from "./categories";
import ExpenseChart from "./ExpenseChart";
import { motion } from "framer-motion";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "Eggs", amount: 5, category: "Groceries" },
    { id: 2, description: "Meat", amount: 20, category: "Groceries" },
    { id: 3, description: "Bulb", amount: 15, category: "Utilities" },
    { id: 4, description: "Bike", amount: 105, category: "AutoMobiles" },
    { id: 5, description: "Car", amount: 200, category: "AutoMobiles" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const largestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0;

  return (
    <>
      <motion.div
        className="dashboard-shell "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-center mb-4 fs-2 text-white text-bg-primary p-2 rounded-pill dashboard-title">
          Expense Tracker Dashboard
        </h2>
        <div className="mb-5">
          <div className="stats-grid animate">
            <div className="stat-card ">
              <h2>
                $
                {expenses
                  .reduce((acc, expense) => expense.amount + acc, 0)
                  .toFixed(2)}
              </h2>
              <p>Total Expenses</p>
            </div>

            <div className="stat-card">
              <h2>{expenses.length}</h2>
              <p>Transactions</p>
            </div>

            <div className="stat-card">
              <h2>${largestExpense.toFixed(2)}</h2>
              <p>Largest Expense</p>
            </div>

            <div className="stat-card">
              <h2>{categories.length}</h2>
              <p>Categories</p>
            </div>
          </div>
          <div className="container1">
            <div className="w-50">
              <ExpenseForm
                onSubmit={(expense) =>
                  setExpenses([
                    ...expenses,
                    { ...expense, id: expenses.length + 1 },
                  ])
                }
              />
            </div>
            <div className="w-50">
              <ExpenseChart expenses={expenses} />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>

        <ExpenseList
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        />
        {expenses.length === 0 && (
          <h6 className="text-center mt-5 ">No expenses added yet.</h6>
        )}
      </motion.div>
    </>
  );
};

export default App;
