import { Link } from 'react-router-dom';
import { Package, FileText } from 'lucide-react';

export function EmployeeDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Employee Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/employee/products"
          className="group bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
          </div>
          <p className="text-gray-600">
            Create, edit, and manage product listings in the catalog
          </p>
        </Link>

        <Link
          to="/employee/requests"
          className="group bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Order Requests</h2>
          </div>
          <p className="text-gray-600">
            View and manage customer order requests and update their status
          </p>
        </Link>
      </div>
    </div>
  );
}
