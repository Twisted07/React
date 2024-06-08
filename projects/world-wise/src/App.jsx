import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// import HomePage from './pages/Homepage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import PageNotFound from './pages/PageNotFound';
// import AppLayout from './pages/AppLayout';
// import Login from './pages/Login';
// import ProtectedRoute from './pages/ProtectedRoute';

import SpinnerFullPage from './components/SpinnerFullPage';
import Form from './components/Form';
import CityList from './components/CityList';
import City from './components/City';
import CountryList from './components/CountryList';
import CitiesProvider from './contexts/CitiesContext';
import { AuthContextProvider } from './contexts/AuthContext';

const HomePage = lazy(()=> import('./pages/Homepage'));
const Product = lazy(()=> import('./pages/Product'));
const Pricing = lazy(()=> import('./pages/Pricing'));
const PageNotFound = lazy(()=> import('./pages/PageNotFound'));
const AppLayout = lazy(()=> import('./pages/AppLayout'));
const Login = lazy(()=> import('./pages/Login'));
const ProtectedRoute = lazy(()=> import('./pages/ProtectedRoute'));


function App() {
  
  return (
    <AuthContextProvider>
    <CitiesProvider>
      <BrowserRouter>

        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='app' element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            } >
              <Route index element={<Navigate replace to={'cities'} />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

    </CitiesProvider>
    </AuthContextProvider>
  );
}

export default App;