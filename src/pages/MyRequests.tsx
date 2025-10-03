import { useSearchParams, Link } from 'react-router-dom';
import { useMyOrderRequests } from '../api/orders';
import { useProducts } from '../api/products';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function MyRequests() {
  const [searchParams] = useSearchParams();
  const { data: requests, isLoading } = useMyOrderRequests();
  const showSuccess = searchParams.get('success') === 'true';

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Requests</h1>

      {showSuccess && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
          Your request has been submitted successfully! We'll review it and get back to you soon.
        </div>
      )}

      {!requests || requests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No requests yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to submit your first request</p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Request #{request.id.slice(0, 8)}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Submitted on {new Date(request.created_at).toLocaleDateString()}
                  </p>
                </div>
                <OrderStatusBadge status={request.status} />
              </div>

              {request.notes && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                  <p className="text-sm text-gray-600">{request.notes}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Items ({request.items.length})
                </p>
                <div className="space-y-2">
                  {request.items.map((item, index) => (
                    <RequestItem key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RequestItem({ item }: { item: { product_id: string; quantity: number } }) {
  const { data: productsData } = useProducts();
  const product = productsData?.products.find((p) => p.id === item.product_id);

  if (!product) {
    return (
      <div className="flex items-center text-sm text-gray-600">
        <span>Product (ID: {item.product_id.slice(0, 8)}) × {item.quantity}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <img
        src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100'}
        alt={product.name}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <Link to={`/products/${product.slug}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
          {product.name}
        </Link>
        <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
      </div>
      <p className="text-sm font-semibold text-gray-900">
        €{(product.base_price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}
