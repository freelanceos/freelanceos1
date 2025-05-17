import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@shared/schema";

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const OrderSummary = ({ cartItems, subtotal, tax, total }: OrderSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">ملخص الطلب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.productId} className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={item.product.imageUrl} 
                  alt={item.product.name} 
                  className="w-12 h-12 object-cover rounded-md" 
                />
                <div className="mr-3">
                  <p className="font-medium text-neutral-800">{item.product.name}</p>
                  <p className="text-sm text-neutral-600">الكمية: {item.quantity}</p>
                </div>
              </div>
              <div className="font-bold text-primary">
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
          
          <div className="border-t border-neutral-200 my-4 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-neutral-600">المجموع الفرعي:</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-neutral-600">الضريبة:</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-neutral-200">
              <span>الإجمالي:</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-md mt-4">
            <div className="flex items-center mb-2">
              <i className="fas fa-shield-alt text-primary ml-2"></i>
              <span className="text-sm font-medium">دفع آمن 100%</span>
            </div>
            <div className="flex items-center mb-2">
              <i className="fas fa-truck-fast text-primary ml-2"></i>
              <span className="text-sm font-medium">تسليم فوري</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-undo text-primary ml-2"></i>
              <span className="text-sm font-medium">ضمان استرداد الأموال لمدة 30 يومًا</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
