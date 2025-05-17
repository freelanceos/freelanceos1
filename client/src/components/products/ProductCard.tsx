import { Link } from "wouter";
import { Product } from "@shared/schema";
import { formatPrice, productTypes } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  showBestseller?: boolean;
  variant?: "light" | "dark";
}

const ProductCard = ({ product, showBestseller = false, variant = "dark" }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const bgColor = variant === "light" ? "bg-neutral-50" : "bg-white";
  
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
    <div className={`${bgColor} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow product-card-transition`}>
      <Link href={`/products/${product.slug}`}>
        <a className="block">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </a>
      </Link>
      <div className="p-4">
        {showBestseller ? (
          <div className="flex justify-between items-start mb-2">
            <span className={`${product.type === 'ebook' ? 'bg-primary-light text-white' : 'bg-secondary text-neutral-800'} text-xs font-bold px-2 py-1 rounded-md`}>
              {productTypes[product.type as keyof typeof productTypes]}
            </span>
            {product.isBestseller && (
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md">
                الأكثر مبيعاً
              </span>
            )}
          </div>
        ) : (
          <span className={`${product.type === 'ebook' ? 'bg-primary-light text-white' : 'bg-secondary text-neutral-800'} text-xs font-bold px-2 py-1 rounded-md`}>
            {productTypes[product.type as keyof typeof productTypes]}
          </span>
        )}
        
        <Link href={`/products/${product.slug}`}>
          <a className="block">
            <h3 className="text-lg font-bold text-neutral-800 mt-2">{product.name}</h3>
          </a>
        </Link>
        
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 flex">
            {renderStars(product.rating)}
          </span>
          <span className="text-neutral-600 text-sm mr-1">({product.reviewCount})</span>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="font-bold text-lg text-primary">{formatPrice(product.price)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-secondary text-neutral-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-secondary-dark focus:outline-none"
            aria-label="أضف إلى السلة"
          >
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
