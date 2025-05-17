import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero gradient overlay */}
      <div className="hero-gradient absolute inset-0 z-10"></div>
      
      {/* Background image */}
      <img 
        src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800" 
        alt="العمل الرقمي والتعلم" 
        className="w-full h-[400px] md:h-[500px] object-cover" 
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="py-16 md:py-24 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            منصتك الرقمية للتعلم والإبداع
          </h1>
          <p className="text-white text-xl mb-8">
            استكشف مجموعة من الكتب الإلكترونية والقوالب المصممة خصيصًا لتعزيز مهاراتك في البرمجة والتصميم.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button className="bg-secondary text-neutral-900 font-bold py-3 px-6 rounded-md hover:bg-secondary-light transition duration-300 text-center">
                استكشف المنتجات
              </Button>
            </Link>
            <Button variant="outline" className="bg-white text-primary font-bold py-3 px-6 rounded-md hover:bg-neutral-100 transition duration-300 text-center">
              تعرف علينا أكثر
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
