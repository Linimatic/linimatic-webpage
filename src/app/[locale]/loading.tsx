export default function Loading() {
  return (
    <section className="bg-zinc-50 pt-32 pb-24 animate-pulse">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-2xl">
          <div className="h-3 w-24 bg-zinc-200 rounded mb-6" />
          <div className="h-10 w-96 bg-zinc-200 rounded mb-4" />
          <div className="h-5 w-80 bg-zinc-200 rounded" />
        </div>
      </div>
    </section>
  );
}
