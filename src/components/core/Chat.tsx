import { cn, Skeleton } from '@nextui-org/react'
import { Rotate02Icon, TickDouble01Icon } from 'hugeicons-react'

type Props = {
  role: 'user' | 'assistant'
  isProcessing?: boolean
  isLoading?: boolean
  timestamp?: string
} & React.PropsWithChildren

export function Chat({
  role,
  timestamp,
  isProcessing = false,
  isLoading = false,
  children,
}: Props) {
  return (
    <div
      className={cn(
        'relative w-fit max-w-[90%] rounded-xl p-2.5 text-sm leading-normal sm:text-base',
        role === 'user' &&
          'ml-auto rounded-br-none border border-primary-100 bg-primary-50 text-primary-800',
        role === 'assistant' &&
          'rounded-bl-none border border-default-100 bg-default-50 text-default-800',
        timestamp && 'pb-7',
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
        {isProcessing ? (
          <div className="flex w-64 flex-col gap-1.5">
            <Skeleton className="h-5 w-4/5 rounded-lg" />
            <Skeleton className="h-5 w-3/5 rounded-lg" />
          </div>
        ) : (
          children
        )}
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-2">
          <p className={cn('text-xs', role === 'user' ? 'text-primary-600' : 'text-default-400')}>
            {timestamp}
          </p>
          {role === 'user' && (
            <>
              {isLoading ? (
                <Rotate02Icon strokeWidth={2} size={16} className="animate-spin text-default-400" />
              ) : (
                <TickDouble01Icon strokeWidth={2} size={16} className="text-primary-600" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
