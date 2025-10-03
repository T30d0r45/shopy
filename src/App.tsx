import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryDetails } from './pages/CategoryDetails';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Checkout } from './pages/Checkout';
import { MyRequests } from './pages/MyRequests';

import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { ManageProducts } from './pages/employee/ManageProducts';
import { ProductForm } from './pages/employee/ProductForm';
import { ManageRequests } from './pages/employee/ManageRequests';

import { AdminDashboard } from './pages/admin/AdminDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:slug" element={<CategoryDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account/requests"
                  element={
                    <ProtectedRoute>
                      <MyRequests />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/employee"
                  element={
                    <ProtectedRoute requiredRole={['EMPLOYEE', 'ADMIN']}>
                      <EmployeeDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employee/products"
                  element={
                    <ProtectedRoute requiredRole={['EMPLOYEE', 'ADMIN']}>
                      <ManageProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employee/products/new"
                  element={
                    <ProtectedRoute requiredRole={['EMPLOYEE', 'ADMIN']}>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employee/products/:id/edit"
                  element={
                    <ProtectedRoute requiredRole={['EMPLOYEE', 'ADMIN']}>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employee/requests"
                  element={
                    <ProtectedRoute requiredRole={['EMPLOYEE', 'ADMIN']}>
                      <ManageRequests />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
