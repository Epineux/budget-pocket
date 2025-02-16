import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Transaction } from "@/schemas/transactionsSchemas";
import { formatDateToReadable } from "@/utils/dateUtils";
import clsx from "clsx";
type Props = {
  transaction: Transaction;
  isLast: boolean;
};

const TransactionsItemOverviewItem = ({ transaction, isLast }: Props) => {
  const readableDate = formatDateToReadable(transaction.date);
  const DisplayPrice = () => {
    const stringAmount = transaction.amount.toFixed(2).toString();
    const displayedPrice = stringAmount.includes("-")
      ? "-$" + stringAmount.slice(1)
      : "+$" + stringAmount;
    return (
      <p
        className={clsx(
          "text-standard-bold",
          transaction.amount < 0 ? "text-grey-900" : "text-secondary-green",
        )}
      >
        {displayedPrice}
      </p>
    );
  };

  return (
    <li>
      <div className="flex justify-between">
        <div className="flex items-center gap-md">
          <Avatar>
            <AvatarImage src={transaction.contacts.avatar} alt="Avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <p className="text-standard-bold text-grey-900">
            {transaction.contacts.name}
          </p>
        </div>
        <div className="flex flex-col items-end gap-xs">
          <DisplayPrice />
          <p className="text-small text-nowrap text-grey-500">{readableDate}</p>
        </div>
      </div>
      {!isLast && <hr className="my-lg border-grey-100" />}
    </li>
  );
};

export default TransactionsItemOverviewItem;
