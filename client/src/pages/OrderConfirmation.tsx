import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OrderDetails from "@/components/orders/OrderDetails";

const OrderConfirmation = () => {
  const [match, params] = useRoute("/order-confirmation/:id");
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
          <div className="h-12 bg-neutral-200 rounded w-3/4 mb-8"></div>
          <div className="h-64 bg-neutral-200 rounded w-full"></div>
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
          <Link href="/products">
            <Button>العودة إلى المنتجات</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>تأكيد الطلب | freelanceos</title>
        <meta name="description" content="تم تأكيد طلبك بنجاح" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/checkout">إتمام الشراء</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/order-confirmation/${orderId}`}>تأكيد الطلب</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <Card className="bg-green-50 mb-8">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
              <i className="fas fa-check-circle text-3xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">تم تأكيد طلبك!</h1>
            <p className="text-lg text-neutral-600 mb-6">
              شكرًا لك على طلبك. تم استلام طلبك وجاري معالجته الآن.
            </p>
            <p className="text-xl font-bold mb-4">
              رقم الطلب: <span className="text-primary">#{data.order.id}</span>
            </p>
            <p className="text-neutral-600 mb-6">
              تم إرسال تفاصيل طلبك إلى بريدك الإلكتروني.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/order-tracking/${data.order.id}`}>
                <Button className="bg-primary">
                  <i className="fas fa-truck-fast ml-2"></i>
                  تتبع طلبك
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline">
                  مواصلة التسوق
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <OrderDetails 
          order={data.order} 
          orderItems={data.items} 
          products={productsById} 
        />
      </div>
    </>
  );
};

export default OrderConfirmation;
