import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import OrderDetails from "@/components/orders/OrderDetails";
import OrderProgress from "@/components/orders/OrderProgress";

const OrderTracking = () => {
  const [match, params] = useRoute("/order-tracking/:id");
  const orderId = match ? Number(params.id) : 0;

  // Fetch order details
  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/orders/${orderId}`],
    enabled: !!orderId,
  });

  // Fetch all products to get their details
  const { data: allProducts } = useQuery({
    queryKey: ['/api/products'],
    enabled: !!data,
  });

  // Map products by ID for easier lookup
  const productsById = allProducts ? 
    allProducts.reduce((acc: Record<number, any>, product: any) => {
      acc[product.id] = product;
      return acc;
    }, {}) : 
    {};

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
          <div className="h-12 bg-neutral-200 rounded w-3/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-64 bg-neutral-200 rounded w-full"></div>
            <div className="h-64 bg-neutral-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">حدث خطأ</h2>
          <p className="text-neutral-600 mb-6">
            لم نتمكن من العثور على تفاصيل الطلب الخاص بك.
          </p>
          <a href="/products" className="inline-flex items-center text-primary hover:underline">
            <i className="fas fa-arrow-right ml-2"></i>
            العودة إلى المنتجات
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>تتبع الطلب #{data.order.id} | freelanceos</title>
        <meta name="description" content="تتبع حالة طلبك ومعرفة موعد وصوله" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/order-confirmation/${orderId}`}>تأكيد الطلب</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/order-tracking/${orderId}`}>تتبع الطلب</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">
          تتبع الطلب <span className="text-primary">#{data.order.id}</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <OrderProgress 
            orderStatus={data.order.status} 
            orderDate={new Date(data.order.createdAt)} 
          />
          
          <OrderDetails 
            order={data.order} 
            orderItems={data.items} 
            products={productsById} 
          />
        </div>
      </div>
    </>
  );
};

export default OrderTracking;
