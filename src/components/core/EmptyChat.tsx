export function EmptyChat() {
  return (
    <div className="rounded-xl border border-primary-700 bg-primary-50 p-3">
      <p className="w-fit bg-gradient-to-r from-default-900 via-cyan-600 to-blue-700 bg-clip-text text-xs font-semibold uppercase text-transparent">
        empty chat
      </p>
      <p className="text-sm text-primary-800">No messages yet, You can start a conversation here</p>
    </div>
  )
}
