import { useCart } from "@/context/CartContext";
import { formatPrice, calculateOrderTotal } from "@/lib/utils";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const CartDrawer = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    isOpen,
    closeCart,
  } = useCart();

  const [, navigate] = useLocation();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    closeCart();
  };

  const { subtotal, tax, total } = calculateOrderTotal(getSubtotal());

  return (
    <>
      {/* Cart Drawer */}
      <div
        className={`cart-drawer fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b border-neutral-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-neutral-800">
              سلة التسوق ({cartItems.length})
            </h3>
            <button
              onClick={closeCart}
              className="text-neutral-600 hover:text-primary focus:outline-none"
              aria-label="إغلاق"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-start border-b border-neutral-200 pb-4"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="mr-3 flex-grow">
                    <h4 className="font-bold text-neutral-800">
                      {item.product.name}
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-primary font-bold">
                        {formatPrice(item.product.price)}
                      </span>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="text-neutral-500 hover:text-primary focus:outline-none"
                          aria-label="تقليل الكمية"
                        >
                          <i className="fas fa-minus-circle"></i>
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="text-neutral-500 hover:text-primary focus:outline-none"
                          aria-label="زيادة الكمية"
                        >
                          <i className="fas fa-plus-circle"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-neutral-400 hover:text-destructive focus:outline-none ml-2"
                    aria-label="إزالة المنتج"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-neutral-600 mb-4">سلة التسوق فارغة</p>
              <Button onClick={handleContinueShopping} variant="outline">
                تصفح المنتجات
              </Button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 bg-neutral-50 border-t border-neutral-200">
            <div className="flex justify-between mb-2">
              <span className="text-neutral-600">المجموع الفرعي:</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-neutral-600">الضريبة:</span>
              <span className="font-bold">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-lg font-bold">الإجمالي:</span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(total)}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-secondary text-neutral-800 font-bold py-3 rounded-md hover:bg-secondary-dark transition duration-300 mb-2"
            >
              إتمام الشراء
            </Button>
            <Button
              onClick={handleContinueShopping}
              variant="outline"
              className="w-full"
            >
              مواصلة التسوق
            </Button>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
    </>
  );
};

export default CartDrawer;
