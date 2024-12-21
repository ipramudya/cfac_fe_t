import React from 'react'

type Props = {
  title: string
} & React.PropsWithChildren

export function AuthLayout({ children, title }: Props) {
  return (
    <section className="flex size-full items-center justify-center">
      <div className="flex w-full max-w-md flex-col space-y-6 rounded-lg border border-gray-400 px-6 py-8">
        <h1 className="w-fit text-xl font-semibold text-gray-900">{title}</h1>
        {children}
      </div>
    </section>
  )
}
