import Image from "next/image";

const TotalBills = () => {
  return (
    <div className="flex flex-col gap-2xl rounded-xl bg-grey-900 p-xl text-white">
      <Image
        src="./assets/images/icon-recurring-bills.svg"
        width={40}
        height={40}
        alt="Recurring Bill Icon"
      />
      <div className="flex flex-col gap-xs">
        <p>Total Bills</p>
        <h1 className="h1">$384.98</h1>
      </div>
    </div>
  );
};

export default TotalBills;