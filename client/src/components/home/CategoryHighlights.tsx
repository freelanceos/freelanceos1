import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

const CategoryHighlights = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">فئات منتجاتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-100 rounded-lg overflow-hidden shadow-md h-[400px] animate-pulse">
                <div className="w-full h-48 bg-neutral-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">فئات منتجاتنا</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <div key={category.id} className="bg-neutral-100 rounded-lg overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-800 mb-2">{category.name}</h3>
                <p className="text-neutral-600 mb-4">{category.description}</p>
                <Link href={`/products/category/${category.slug}`}>
                  <a className="text-primary font-bold hover:text-primary-dark inline-flex items-center">
                    استكشف المنتجات
                    <i className="fas fa-chevron-left mr-2"></i>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
