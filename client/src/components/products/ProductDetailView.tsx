import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useCart } from "@/context/CartContext";
import { formatPrice, productTypes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductDetailViewProps {
  product: Product;
}

const ProductDetailView = ({ product }: ProductDetailViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Get reviews for this product
  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: [`/api/products/${product.id}/reviews`],
  });
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto rounded-md" 
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <span className={`inline-block ${product.type === 'ebook' ? 'bg-primary-light text-white' : 'bg-secondary text-neutral-800'} text-sm font-bold px-3 py-1 rounded-md mb-4`}>
            {productTypes[product.type as keyof typeof productTypes]}
          </span>
          
          {product.isBestseller && (
            <span className="inline-block bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-md mr-2 mb-4">
              الأكثر مبيعاً
            </span>
          )}
          
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 flex text-lg">
              {renderStars(product.rating)}
            </span>
            <span className="text-neutral-600 mr-2">({product.reviewCount} تقييم)</span>
          </div>
          
          <p className="text-neutral-700 mb-6">{product.description}</p>
          
          <div className="text-2xl font-bold text-primary mb-6">{formatPrice(product.price)}</div>
          
          <div className="flex items-center space-x-4 space-x-reverse mb-6">
            <div className="flex items-center border border-neutral-300 rounded-md">
              <button 
                onClick={handleDecreaseQuantity}
                className="px-3 py-2 text-neutral-600 hover:text-primary focus:outline-none"
                aria-label="تقليل الكمية"
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="px-4 py-2 border-x border-neutral-300">{quantity}</span>
              <button 
                onClick={handleIncreaseQuantity}
                className="px-3 py-2 text-neutral-600 hover:text-primary focus:outline-none"
                aria-label="زيادة الكمية"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-secondary text-neutral-800 font-bold py-3 px-6 rounded-md hover:bg-secondary-dark transition duration-300"
            >
              <i className="fas fa-shopping-cart ml-2"></i>
              إضافة إلى السلة
            </Button>
          </div>
          
          <div className="border-t border-neutral-200 pt-6">
            <div className="flex items-center space-x-6 space-x-reverse text-neutral-600">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-primary ml-2"></i>
                <span>تسليم فوري</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-undo text-primary ml-2"></i>
                <span>ضمان استرداد الأموال</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-shield-alt text-primary ml-2"></i>
                <span>دفع آمن</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">التقييمات</h2>
        
        {isLoadingReviews ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                    <div className="mr-4">
                      <div className="h-5 bg-neutral-200 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-neutral-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-neutral-200 rounded w-24 mb-3"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-light text-white rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-xl"></i>
                    </div>
                    <div className="mr-4">
                      <h4 className="font-bold text-neutral-800">مستخدم</h4>
                      <p className="text-neutral-600 text-sm">
                        {new Date(review.createdAt).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  <div className="text-yellow-500 flex mb-3">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-neutral-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-neutral-600">لا توجد تقييمات بعد لهذا المنتج.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductDetailView;
