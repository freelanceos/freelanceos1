import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Helmet } from "react-helmet";
import ProductDetailView from "@/components/products/ProductDetailView";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

const ProductDetail = () => {
  const [match, params] = useRoute("/products/:slug");
  const slug = match ? params.slug : "";

  // Fetch product
  const { data: product, isLoading, error } = useQuery({
    queryKey: [`/api/products/${slug}`],
    enabled: !!slug,
  });

  // Fetch category if product is loaded
  const { data: category } = useQuery({
    queryKey: ['/api/categories', product?.categoryId],
    queryFn: async () => {
      if (!product) return null;
      const res = await fetch(`/api/categories`);
      const categories = await res.json();
      return categories.find((cat: any) => cat.id === product.categoryId);
    },
    enabled: !!product,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg h-96 shadow-md"></div>
            <div className="space-y-4">
              <div className="h-8 bg-neutral-200 rounded w-1/2"></div>
              <div className="h-5 bg-neutral-200 rounded w-1/4"></div>
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
              <div className="flex space-x-4">
                <div className="h-12 bg-neutral-200 rounded w-32"></div>
                <div className="h-12 bg-neutral-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">عذراً، لم يتم العثور على المنتج</h2>
          <p className="text-neutral-600 mb-6">
            المنتج الذي تبحث عنه غير موجود أو تم إزالته.
          </p>
          <a href="/products" className="inline-flex items-center text-primary hover:underline">
            <i className="fas fa-arrow-right ml-2"></i>
            العودة إلى صفحة المنتجات
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | freelanceos</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">المنتجات</BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products/category/${category.slug}`}>{category.name}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/${product.slug}`}>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <ProductDetailView product={product} />
      </div>
    </>
  );
};

export default ProductDetail;
