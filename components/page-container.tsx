export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-3 pb-8 sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-4 sm:space-y-5">{children}</div>
    </main>
  );
}
