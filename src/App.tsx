import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm from "./ExpenseForm";
import categories from "./categories";
import ExpenseChart from "./ExpenseChart";

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

  return (
    <>
      <div className="dashboard-shell">
        <h2 className="text-center mb-4 fs-2 text-white text-bg-primary p-2 rounded-pill dashboard-title">
          Expense Tracker Dashboard
        </h2>
        <div className="mb-5">
          <div className="stats-grid">
            <div className="stat-card">
              <h2>$2,450</h2>
              <p>Total Expenses</p>
            </div>

            <div className="stat-card">
              <h2>12</h2>
              <p>Transactions</p>
            </div>

            <div className="stat-card">
              <h2>$420</h2>
              <p>Largest Expense</p>
            </div>

            <div className="stat-card">
              <h2>4</h2>
              <p>Categories</p>
            </div>
          </div>
          <ExpenseForm
            onSubmit={(expense) =>
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            }
          />
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
        <ExpenseChart expenses={expenses} />
      </div>
    </>
  );
};

export default App;
