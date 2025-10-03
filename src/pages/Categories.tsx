import { Link } from 'react-router-dom';
import { useCategories } from '../api/categories';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Categories() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Categories</h1>

      {!categories || categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No categories available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={category.image_url || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{category.name}</h2>
                {category.description && (
                  <p className="text-gray-600">{category.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
