import Loader from "@/components/Loader";
import NewPotDialog from "@/components/Pots/NewPotDialog";
import PotList from "@/components/Pots/PotList";
import { Suspense } from "react";

const page = () => {
  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <div className="flex items-center justify-between">
        <h1 className="h1 text-grey-900">Pots</h1>
        <NewPotDialog />
      </div>
      <Suspense fallback={<Loader />}>
        <PotList />
      </Suspense>
    </main>
  );
};

export default page;
