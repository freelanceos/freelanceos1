import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice, getOrderStatusText, formatDate } from "@/lib/utils";
import { Order, OrderItem, Product } from "@shared/schema";

interface OrderDetailsProps {
  order: Order;
  orderItems: OrderItem[];
  products: Record<number, Product>;
}

const OrderDetails = ({ order, orderItems, products }: OrderDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">تفاصيل الطلب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">رقم الطلب</h4>
              <p className="font-bold">#{order.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">تاريخ الطلب</h4>
              <p className="font-bold">{formatDate(new Date(order.createdAt))}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">حالة الطلب</h4>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {getOrderStatusText(order.status)}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-1">إجمالي الطلب</h4>
              <p className="font-bold text-primary">{formatPrice(order.total)}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">المنتجات المطلوبة</h4>
            <div className="space-y-3">
              {orderItems.map((item) => {
                const product = products[item.productId];
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {product && (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-md" 
                        />
                      )}
                      <div className="mr-3">
                        <p className="font-medium text-neutral-800">
                          {product ? product.name : `منتج #${item.productId}`}
                        </p>
                        <p className="text-sm text-neutral-600">الكمية: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-bold text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-neutral-600">المجموع الفرعي:</span>
              <span className="font-medium">{formatPrice(order.total / 1.15)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-neutral-600">الضريبة (15%):</span>
              <span className="font-medium">{formatPrice(order.total - (order.total / 1.15))}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-neutral-200">
              <span>الإجمالي:</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
