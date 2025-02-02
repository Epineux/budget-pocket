const BalanceLoader = () => {
  return (
    <div className="mt-3xl flex h-28 w-full items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute h-full w-full rounded-full border-4 border-neutral-700/30" />
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-t-neutral-600" />
      </div>
    </div>
  );
};

export default BalanceLoader;
