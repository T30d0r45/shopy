import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCartStore } from '../store/cartStore';

export function Navbar() {
  const { user, profile, signOut, isEmployee, isAdmin } = useAuth();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              FurnitureShop
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/categories" className="text-gray-700 hover:text-gray-900 transition">
                Categories
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-gray-900 transition">
                Products
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 transition">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                {isEmployee && (
                  <Link
                    to="/employee"
                    className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    <Package className="w-5 h-5" />
                    <span className="hidden md:inline">Employee</span>
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="hidden md:inline">Admin</span>
                  </Link>
                )}
                <Link
                  to="/account/requests"
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-gray-900 transition"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{profile?.full_name}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-gray-700 hover:text-gray-900 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
