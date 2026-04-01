export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="px-4 pb-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-4">{children}</div>
    </main>
  );
}
