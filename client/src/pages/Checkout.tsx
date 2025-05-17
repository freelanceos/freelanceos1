import { useState } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useCart } from "@/context/CartContext";
import { calculateOrderTotal } from "@/lib/utils";
import { Helmet } from "react-helmet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { cartItems, getSubtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { subtotal, tax, total } = calculateOrderTotal(getSubtotal());

  // Redirect to products if cart is empty
  if (cartItems.length === 0) {
    navigate("/products");
    return null;
  }

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Create order payload
      const orderData = {
        userId: 1, // Demo user ID
        total: total,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price
        }))
      };
      
      // Submit order to API
      const response = await apiRequest("POST", "/api/orders", orderData);
      const result = await response.json();
      
      // Clear cart and redirect to confirmation page
      clearCart();
      navigate(`/order-confirmation/${result.order.id}`);
      
      toast({
        title: "تم إنشاء الطلب بنجاح",
        description: `رقم الطلب: #${result.order.id}`,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "حدث خطأ أثناء إنشاء الطلب",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>إتمام الشراء | freelanceos</title>
        <meta name="description" content="إتمام شراء المنتجات في السلة وإنهاء عملية الدفع" />
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
          <BreadcrumbItem>
            <BreadcrumbLink href="/checkout">إتمام الشراء</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">إتمام الشراء</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
          
          <div>
            <OrderSummary 
              cartItems={cartItems}
              subtotal={subtotal}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
