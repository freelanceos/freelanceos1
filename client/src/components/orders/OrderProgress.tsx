import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface OrderProgressProps {
  orderStatus: string;
  orderDate: Date;
}

const OrderProgress = ({ orderStatus, orderDate }: OrderProgressProps) => {
  // Define the steps in the order process
  const steps = [
    { key: "ordered", label: "تم الطلب", icon: "fas fa-shopping-cart", date: orderDate },
    { key: "processing", label: "جاري المعالجة", icon: "fas fa-cog", date: new Date(orderDate.getTime() + 1000 * 60 * 30) },
    { key: "completed", label: "تم الإكمال", icon: "fas fa-check-circle", date: new Date(orderDate.getTime() + 1000 * 60 * 60) },
  ];
  
  // Determine the current step based on the order status
  let currentStepIndex = 0;
  if (orderStatus === "completed") {
    currentStepIndex = 2;
  } else if (orderStatus === "pending") {
    currentStepIndex = 1;
  }
  
  // For cancelled orders
  if (orderStatus === "cancelled") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">حالة الطلب</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
              <i className="fas fa-times-circle text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">تم إلغاء الطلب</h3>
            <p className="text-neutral-600">
              تم إلغاء هذا الطلب. إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع خدمة العملاء.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">حالة الطلب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-5 right-5 h-full w-0.5 bg-neutral-200"></div>
            
            {steps.map((step, index) => {
              const isActive = index <= currentStepIndex;
              const isPast = index < currentStepIndex;
              
              return (
                <div key={step.key} className="relative flex items-start mb-6 last:mb-0">
                  {/* Circle */}
                  <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0
                    ${isActive ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                    <i className={step.icon}></i>
                  </div>
                  
                  {/* Content */}
                  <div className="mr-4 flex-grow">
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold text-neutral-800">{step.label}</h3>
                      {isPast && (
                        <span className="mr-2 text-green-600">
                          <i className="fas fa-check-circle"></i>
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-600">
                      {formatDate(step.date)}
                    </p>
                    
                    {step.key === "ordered" && (
                      <p className="text-sm text-neutral-500 mt-1">
                        تم استلام طلبك وجاري المعالجة
                      </p>
                    )}
                    
                    {step.key === "processing" && (
                      <p className="text-sm text-neutral-500 mt-1">
                        يتم الآن معالجة طلبك وتجهيزه
                      </p>
                    )}
                    
                    {step.key === "completed" && (
                      <p className="text-sm text-neutral-500 mt-1">
                        تم إكمال طلبك بنجاح وتم إرسال التفاصيل إلى بريدك الإلكتروني
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {orderStatus === "completed" && (
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <div className="flex items-center text-green-700">
                <i className="fas fa-check-circle ml-2 text-lg"></i>
                <span className="font-medium">تم إكمال الطلب بنجاح!</span>
              </div>
              <p className="text-green-600 text-sm mt-1">
                يمكنك الآن تنزيل المنتجات من صفحة "طلباتي"
              </p>
            </div>
          )}
          
          {orderStatus === "pending" && (
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <div className="flex items-center text-yellow-700">
                <i className="fas fa-info-circle ml-2 text-lg"></i>
                <span className="font-medium">الطلب قيد المعالجة</span>
              </div>
              <p className="text-yellow-600 text-sm mt-1">
                يتم الآن معالجة طلبك، سيتم إشعارك عند اكتماله
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderProgress;
