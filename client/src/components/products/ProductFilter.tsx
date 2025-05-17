import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
  initialCategorySlug?: string;
}

interface FilterState {
  categories: string[];
  types: string[];
  priceRange: string;
  sortBy: string;
}

const ProductFilter = ({
  onFilterChange,
  initialCategorySlug,
}: ProductFilterProps) => {
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    types: [],
    priceRange: "all",
    sortBy: "newest",
  });

  useEffect(() => {
    if (initialCategorySlug && categories) {
      const category = categories.find(
        (cat) => cat.slug === initialCategorySlug,
      );
      if (category) {
        setFilters((prev) => ({
          ...prev,
          categories: [category.id.toString()],
        }));
      }
    }
  }, [initialCategorySlug, categories]);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCategoryChange = (categoryId: string) => {
    setFilters((prev) => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId];

      return {
        ...prev,
        categories: newCategories,
      };
    });
  };

  const handleTypeChange = (type: string) => {
    setFilters((prev) => {
      const newTypes = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];

      return {
        ...prev,
        types: newTypes,
      };
    });
  };

  const handlePriceChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value,
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-neutral-800 mb-6">
        تصفية المنتجات
      </h3>

      <Accordion type="multiple" defaultValue={["categories", "type", "price"]}>
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="py-3">الفئات</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {isLoadingCategories ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-5 bg-neutral-200 rounded w-1/2"></div>
                  <div className="h-5 bg-neutral-200 rounded w-2/3"></div>
                </div>
              ) : (
                categories?.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(
                        category.id.toString(),
                      )}
                      onCheckedChange={() =>
                        handleCategoryChange(category.id.toString())
                      }
                      className="ml-2"
                    />
                    <Label htmlFor={`category-${category.id}`}>
                      {category.name}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Type */}
        <AccordionItem value="type">
          <AccordionTrigger className="py-3">نوع المنتج</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <div className="flex items-center">
                <Checkbox
                  id="type-ebook"
                  checked={filters.types.includes("ebook")}
                  onCheckedChange={() => handleTypeChange("ebook")}
                  className="ml-2"
                />
                <Label htmlFor="type-ebook">كتاب إلكتروني</Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="type-template"
                  checked={filters.types.includes("template")}
                  onCheckedChange={() => handleTypeChange("template")}
                  className="ml-2"
                />
                <Label htmlFor="type-template">قالب</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3">نطاق السعر</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-all"
                  name="price-range"
                  value="all"
                  checked={filters.priceRange === "all"}
                  onChange={() => handlePriceChange("all")}
                  className="ml-2"
                />
                <Label htmlFor="price-all">الكل</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-under-100"
                  name="price-range"
                  value="under100"
                  checked={filters.priceRange === "under100"}
                  onChange={() => handlePriceChange("under100")}
                  className="ml-2"
                />
                <Label htmlFor="price-under-100">أقل من 100 جنيه</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-100-200"
                  name="price-range"
                  value="100to200"
                  checked={filters.priceRange === "100to200"}
                  onChange={() => handlePriceChange("100to200")}
                  className="ml-2"
                />
                <Label htmlFor="price-100-200">100 - 200 جنيه</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-over-200"
                  name="price-range"
                  value="over200"
                  checked={filters.priceRange === "over200"}
                  onChange={() => handlePriceChange("over200")}
                  className="ml-2"
                />
                <Label htmlFor="price-over-200">أكثر من 200 جنيه</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Sort */}
      <div className="mt-6">
        <Label htmlFor="sort-by" className="block mb-2">
          ترتيب حسب
        </Label>
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger id="sort-by" className="w-full">
            <SelectValue placeholder="ترتيب حسب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">الأحدث</SelectItem>
            <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
            <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
            <SelectItem value="rating">التقييم</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductFilter;
