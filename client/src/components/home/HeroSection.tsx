import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="flex w-full min-h-screen">
      {/* الجانب الأيسر - النص */}
      <div className="flex flex-col justify-center px-12 w-1/2 bg-gray-900 text-white">
        <div className="mb-4 inline-block bg-white bg-opacity-30 rounded-full px-5 py-1 text-sm font-semibold select-none w-max">
          خدمات البرمجة والتصميم
        </div>
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          حلول برمجية وتصميم احترافية لدعم أعمالك الرقمية
        </h1>
        <p className="text-lg mb-8">
          نقدم تطوير برمجيات، تصميم واجهات جذابة، وبيع الكتب الإلكترونية
          والدورات التعليمية لتطوير مهاراتك.
        </p>
        <div className="flex gap-4">
          <Link href="/contact">
            <Button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
              تواصل معنا
            </Button>
          </Link>
          <Link href="/products">
            <Button className="bg-transparent border border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-black transition">
              منتجاتنا
            </Button>
          </Link>
        </div>
      </div>

      {/* الجانب الأيمن - صورة */}
      <div className="w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="برمجة وتصميم وكتب إلكترونية ودورات"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
    </section>
  );
};

export default HeroSection;
