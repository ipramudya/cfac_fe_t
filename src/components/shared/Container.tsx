export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-gray-100">
      <div className="mx-auto h-dvh max-w-screen-sm sm:px-3">
        <div className="relative flex h-full flex-col items-center justify-center sm:py-3">
          {children}
        </div>
      </div>
    </main>
  )
}
