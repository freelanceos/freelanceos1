import { Product } from "@shared/schema";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading = false }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md h-[340px] animate-pulse">
            <div className="w-full h-48 bg-neutral-200"></div>
            <div className="p-4">
              <div className="h-5 bg-neutral-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-2/3 mb-3"></div>
              <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <i className="fas fa-search text-4xl text-neutral-400 mb-4"></i>
        <h3 className="text-xl font-bold text-neutral-700 mb-2">لم يتم العثور على منتجات</h3>
        <p className="text-neutral-500">جرب كلمات بحث مختلفة أو تصفية أخرى</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
