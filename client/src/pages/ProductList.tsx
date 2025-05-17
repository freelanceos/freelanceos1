import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Helmet } from 'react-helmet';
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilter from "@/components/products/ProductFilter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

interface FilterState {
  categories: string[];
  types: string[];
  priceRange: string;
  sortBy: string;
}

const ProductList = () => {
  const [match, params] = useRoute("/products/category/:slug");
  const categorySlug = match ? params.slug : undefined;
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    types: [],
    priceRange: 'all',
    sortBy: 'newest',
  });

  // Fetch all products
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  // Fetch category if we have a slug
  const { data: category } = useQuery({
    queryKey: ['/api/categories', categorySlug],
    queryFn: async () => {
      if (!categorySlug) return null;
      const res = await fetch(`/api/categories/${categorySlug}`);
      if (res.status === 404) return null;
      return res.json();
    },
    enabled: !!categorySlug,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!allProducts) return;

    // Apply filters to products
    let result = [...allProducts];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.categoryId.toString())
      );
    }

    // Type filter
    if (filters.types.length > 0) {
      result = result.filter(product => 
        filters.types.includes(product.type)
      );
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under100':
          result = result.filter(product => product.price < 100);
          break;
        case '100to200':
          result = result.filter(product => product.price >= 100 && product.price <= 200);
          break;
        case 'over200':
          result = result.filter(product => product.price > 200);
          break;
      }
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return b.id - a.id;
      }
    });

    setFilteredProducts(result);
  }, [allProducts, filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>
          {category ? `${category.name} | freelanceos` : 'تصفح المنتجات | freelanceos'}
        </title>
        <meta
          name="description"
          content={
            category
              ? `تصفح ${category.name} واختر من مجموعة واسعة من المنتجات المميزة لتطوير مهاراتك`
              : 'تصفح مجموعة واسعة من الكتب الإلكترونية وقوالب التصميم لتعزيز مهاراتك في البرمجة والتصميم'
          }
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
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
        </Breadcrumb>
        
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">
          {category ? category.name : 'جميع المنتجات'}
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="lg:w-1/4">
            <ProductFilter 
              onFilterChange={handleFilterChange}
              initialCategorySlug={categorySlug}
            />
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <ProductGrid 
              products={filteredProducts}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
