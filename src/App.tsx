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
import EditPage from './users/components/EditPage';
import ChangePasswordPage from './users/components/ChangePasswordPage';
import MapComponent from './map/MapComponent';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MapTest from './map/MapTest';

const queryClient = new QueryClient();
const { REACT_APP_GOOGLE_KEY } = process.env;

function App() {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/user">
          <Route path=":id" element={<EditPage />} />
          <Route path="changePassword" element={<ChangePasswordPage />} />
        </Route>
        
        <Route path="/qr/:id" element={<QRPage />} />
        <Route path="/map" element={<MapTest />} />
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
