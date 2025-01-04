import BudgetsChart from "@/components/Budgets/BudgetsChart";
import data from "../../constants/data.json";
import BudgetSummaryItem from "./BudgetSummaryItem";

const BudgetChartCard = () => {
  const budgetsData = data.budgets;
  return (
    <div className="rounded-xl bg-white p-2xl @container">
      <div className="items-center justify-around @[550px]:flex">
        <BudgetsChart budgetsData={budgetsData} />
        <div className="mt-3xl @[550px]:mt-0">
          <h2 className="h2 text-grey-900">Spending Summary</h2>
          <ul className="mt-xl grid grid-cols-1">
            {budgetsData.map((category, index) => (
              <li key={category.name}>
                <BudgetSummaryItem category={category} />
                {index !== budgetsData.length - 1 && (
                  <hr className="my-md border-grey-100" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BudgetChartCard;
