import {
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  PieChart,
  Pie,
} from "recharts";

interface Expense {
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenses: Expense[];
}

const ExpenseChart = ({ expenses }: Props) => {
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      const existing = acc.find((item) => item.name === expense.category);

      if (existing) {
        existing.value += expense.amount;
      } else {
        acc.push({
          name: expense.category,
          value: expense.amount,
        });
      }

      return acc;
    },
    [] as { name: string; value: number }[],
  );

  const COLORS = [
    "#3898f8",
    "#02b378",
    "#f7ae31",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <div className="chart-section">
      <h2 className="chart-title">Expense Analytics</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={categoryTotals}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {categoryTotals.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
