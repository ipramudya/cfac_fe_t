## About the Project

This project provides the frontend user interface for CFAC-T, a nutrition and recipe assistant powered by AI. Users can interact with the AI through a chat interface, receiving recipe recommendations, nutritional information, and ingredient details. The frontend utilizes a WebSocket connection for real-time communication with the backend server.

## Purpose

The purpose of this frontend is to create a user-friendly and engaging experience for interacting with the CFAC-T AI. It focuses on providing a clean and intuitive chat interface, allowing users to easily ask questions and receive informative responses.

## Main Features

- **Real-time Chat Interface:** Uses WebSockets for instant communication with the backend AI.
- **User Authentication:** Securely handles user login and registration.
- **Responsive Design:** Adapts seamlessly to various screen sizes (desktop, mobile).
- **User-Friendly Design:** Provides a clean and intuitive user experience.
- **Clear Message Display:** Organizes chat messages clearly, differentiating between user and assistant responses.
- **Password Change Functionality:** Allows users to securely change their passwords.
- **Session Management:** Manages user sessions securely.
- **Error Handling:** Provides informative error messages to the user.
- **Message Clearing:** Enables users to clear their chat history.

## Tech Stack

- **Frontend Framework:** React
- **State Management:** Zustand, Native React Context API
- **UI Library:** NextUI
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form, Zod
- **HTTP Client:** Axios
- **HTTP cache & data fetching:** swr
- **WebSocket Client:** Socket.IO Client
- **Routing:** React Router DOM

## Project Structure

```
src/
├── api/           # API calls for authentication and data fetching
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components
│   ├── core/       # Core components (Chat, ChatInput, ChatHeader, etc.)
│   ├── layout/     # Page layouts (RootLayout, AuthLayout, ChatLayout)
│   ├── pages/      # Individual pages (ChatPage, LoginPage, RegisterPage)
│   └── shared/     # Shared components
├── form-validation/ # Form validation schemas using Zod
├── hooks/         # Custom React hooks
├── state/         # State management logic
├── types/         # Type definitions
├── utils/         # Utility functions
└── main.tsx       # Main application entry point
```

## Requirements

- Node.js (LTS version recommended)
- npm or yarn

## Dependencies Setup

1. Install dependencies: `npm install`

## Running the Project

1. Make sure you have a running backend server. The frontend uses the API endpoint defined in your `.env` file (see `.env.example`).
2. Start the development server: `npm run dev`

## Build the Project

To create a production build run: `npm run build` This will generate the optimized build in the `dist` folder.

## Additional Scripts

- `npm run lint`: Runs ESLint to check for code style errors.
- `npm run fmt`: Formats the code using Prettier.

## Environment Variables

Create a `.env` file in the root of the project with the following:

```
VITE_API_ENDPOINT=http://localhost:3000/api/v1  // Replace with your backend API endpoint.
VITE_WS_ENDPOINT=ws://localhost:3000 // Replace with your backend WebSocket endpoint
```

A `.env.example` file is provided as a template. Remember to rename it to `.env` and fill in the correct values.
