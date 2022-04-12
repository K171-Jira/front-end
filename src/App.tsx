import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignupPage from './registerForm/SignupPage';
import LoginPage from './registerForm/LoginPage';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <SignupPage /> */}
      <LoginPage />
    </QueryClientProvider>
  );
}

export default App;
