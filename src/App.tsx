import React from 'react';
import './App.css';
import SignupPage from './authentication/SignupPage';
import LoginPage from './authentication/LoginPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from './common/components/NavBar';
import { MantineProvider } from '@mantine/core';
import { Route, Routes, useLocation } from 'react-router-dom';
import MaskList from './masks/components/MaskList';
import MaskEdit from './masks/components/MaskEdit';
import QRPage from './common/components/QRPage';
import PointsMap from './map/PointsMap';
import EditPage from './users/components/EditPage';
import ChangePasswordPage from './users/components/ChangePasswordPage';
import StripeContainer from './payment/StripeContainer';
import AuthProvider from './authentication/context/AuthContext';
import CartProvider from './common/context/ShoppingCartContext';
import LandingPage from './landingPage/LandingPage';
import OrderHistory from './orders/components/OrderHistory';

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();
  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            {pathname !== '/map' && pathname !== '/' && <NavBar />}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignupPage />} />
              <Route path="/user">
                <Route path=":id" element={<EditPage />} />
                <Route path="changePassword" element={<ChangePasswordPage />} />
              </Route>

              <Route path="/orderHistory" element={<OrderHistory />} />

              <Route path="/qr/:id" element={<QRPage />} />
              <Route path="/map" element={<PointsMap />} />
              <Route path="/payment" element={<StripeContainer />} />
              <Route path="/masks">
                <Route path="add" element={<MaskEdit />} />
                <Route path=":id" element={<MaskEdit />} />
                <Route index element={<MaskList />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
