type Props = {
  title: string
  description: React.ReactNode
} & React.PropsWithChildren

export function AuthLayout({ children, title, description }: Props) {
  return (
    <section className="flex size-full items-center justify-center">
      <div className="flex w-full max-w-md flex-col space-y-6 rounded-lg border border-divider bg-background px-4 py-6">
        <div className="flex flex-col space-y-1">
          <h1 className="w-fit bg-gradient-to-t from-foreground-800 to-foreground-500 bg-clip-text text-2xl font-semibold text-transparent">
            {title}
          </h1>
          {description}
        </div>
        {children}
      </div>
    </section>
  )
}
