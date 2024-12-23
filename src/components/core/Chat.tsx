import { cn, Skeleton } from '@nextui-org/react'

type Props = {
  role: 'user' | 'assistant'
  isLoading?: boolean
  date?: string
} & React.PropsWithChildren

export function Chat({ role, date, isLoading, children }: Props) {
  return (
    <div
      className={cn(
        'relative w-fit max-w-[90%] rounded-xl p-2.5 text-sm leading-normal sm:text-base',
        role === 'user' &&
          'ml-auto rounded-br-none border border-primary-100 bg-primary-50 text-primary-800',
        role === 'assistant' &&
          'rounded-bl-none border border-default-100 bg-default-50 text-default-800',
        date && 'pb-7',
      )}
    >
      <div className="flex flex-col gap-1.5">
        <p
          className={cn(
            'w-fit bg-gradient-to-r bg-clip-text text-xs font-semibold uppercase leading-none tracking-wider text-transparent',
            role === 'user'
              ? 'from-primary-700 to-primary-600'
              : 'from-violet-700 via-cyan-600 to-blue-700',
          )}
        >
          {role === 'user' ? 'you' : 'assistant'}
        </p>
        {isLoading ? (
          <div className="flex w-64 flex-col gap-1.5">
            <Skeleton className="h-5 w-4/5 rounded-lg" />
            <Skeleton className="h-5 w-3/5 rounded-lg" />
          </div>
        ) : (
          children
        )}
        {children}
        {date && <p className="absolute bottom-1.5 right-1.5 text-xs text-default-400">{date}</p>}
      </div>
    </div>
  )
}
