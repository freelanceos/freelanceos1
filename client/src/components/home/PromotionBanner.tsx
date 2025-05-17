import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const PromotionBanner = () => {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">خصم 30% على جميع الكتب الإلكترونية</h2>
            <p className="text-xl mb-6">فرصتك لتطوير مهاراتك بأسعار مخفضة. العرض ساري حتى نهاية الشهر!</p>
            <Link href="/products/category/programming">
              <Button className="bg-white text-primary font-bold py-3 px-6 rounded-md hover:bg-neutral-100 transition duration-300 inline-block">
                تسوق الآن
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 text-center">
            <img 
              src="https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="خصم على الكتب الإلكترونية" 
              className="rounded-lg shadow-lg mx-auto max-w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
