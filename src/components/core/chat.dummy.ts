export const dummyChats = [
  { role: 'user', date: '2024-04-26 10:00:00', text: 'Hello, how are you?' },
  {
    role: 'assistant',
    date: '2024-04-26 10:00:05',
    text: 'I am doing well, thank you for asking. How can I help you today?',
  },
  {
    role: 'user',
    date: '2024-04-26 10:00:10',
    text: 'I need help with writing a TypeScript type.',
  },
  { role: 'assistant', isLoading: true, text: '' }, // Loading, no text yet
  {
    role: 'user',
    date: '2024-04-26 10:00:20',
    text: 'Can you generate some dummy data for me too?',
  },
  {
    role: 'assistant',
    date: '2024-04-26 10:00:25',
    text: 'Certainly!  Here is some dummy data...',
  },
  { role: 'user', date: '2024-04-26 10:00:30', text: "That's perfect, thanks!" },
  {
    role: 'assistant',
    date: '2024-04-26 10:00:35',
    text: 'You are welcome! Is there anything else I can assist you with?',
  },
  { role: 'assistant', date: '2024-04-26 10:00:40', isLoading: false, text: 'Just let me know!' },
  { role: 'user', date: '2024-04-26 10:00:45', text: 'I think that will be all for now.' },
] as const
