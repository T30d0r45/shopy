import { useState } from 'react';
import { useAllOrderRequests, useUpdateOrderStatus } from '../../api/orders';
import { useAllProducts } from '../../api/products';
import { OrderStatusBadge } from '../../components/OrderStatusBadge';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { OrderStatus } from '../../types';

const STATUS_OPTIONS: OrderStatus[] = ['NEW', 'IN_REVIEW', 'OFFER_SENT', 'CONFIRMED', 'REJECTED'];

export function ManageRequests() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | undefined>();
  const { data: requests, isLoading } = useAllOrderRequests(selectedStatus);
  const { data: productsData } = useAllProducts();
  const updateStatus = useUpdateOrderStatus();

  const handleStatusUpdate = async (requestId: string, newStatus: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ id: requestId, status: newStatus });
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Manage Order Requests</h1>

      <div className="mb-6">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Status
        </label>
        <select
          id="status-filter"
          value={selectedStatus || ''}
          onChange={(e) => setSelectedStatus(e.target.value as OrderStatus || undefined)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {!requests || requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No requests found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Request #{request.id.slice(0, 8)}
                  </h2>
                  <p className="text-sm text-gray-600">
                    User ID: {request.user_id.slice(0, 8)} | Submitted:{' '}
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>
                <OrderStatusBadge status={request.status} />
              </div>

              {request.notes && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Customer Notes:</p>
                  <p className="text-sm text-gray-600">{request.notes}</p>
                </div>
              )}

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Items ({request.items.length})
                </p>
                <div className="space-y-2">
                  {request.items.map((item, index) => {
                    const product = productsData?.find((p) => p.id === item.product_id);
                    return (
                      <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded">
                        <div className="flex items-center space-x-3">
                          {product && (
                            <img
                              src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100'}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {product?.name || `Product ID: ${item.product_id.slice(0, 8)}`}
                            </p>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        {product && (
                          <p className="font-semibold text-gray-900">
                            €{(product.base_price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor={`status-${request.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  id={`status-${request.id}`}
                  value={request.status}
                  onChange={(e) => handleStatusUpdate(request.id, e.target.value as OrderStatus)}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
