import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/products/ProductCard";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products/featured'],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800">منتجات مميزة</h2>
            <Link href="/products">
              <a className="text-primary font-bold hover:text-primary-dark">عرض الكل</a>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md h-[320px] animate-pulse">
                <div className="w-full h-48 bg-neutral-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-neutral-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-neutral-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-800">منتجات مميزة</h2>
          <Link href="/products">
            <a className="text-primary font-bold hover:text-primary-dark">عرض الكل</a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
