import React from 'react';
import './App.css';
import SignupPage from './authentication/SignupPage';
import LoginPage from './authentication/LoginPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from './common/components/NavBar';
import { Route, Routes } from 'react-router-dom';
import MaskList from './masks/components/MaskList';
import MaskEdit from './masks/components/MaskEdit';
import QRPage from './common/components/QRPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/qr/:id" element={<QRPage />} />
        <Route path="/masks">
          <Route path="add" element={<MaskEdit />} />
          <Route path=":id" element={<MaskEdit />} />
          <Route index element={<MaskList />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
