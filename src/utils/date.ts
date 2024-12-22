export function shortenDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return date.toLocaleTimeString('en-US', options)
}
