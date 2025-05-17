import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 bg-neutral-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">ابدأ رحلة التعلم والإبداع اليوم</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          انضم إلى آلاف المطورين والمصممين الذين يطورون مهاراتهم مع freelanceos. منتجاتنا مصممة لمساعدتك على النجاح في المجال الرقمي.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition duration-300">
              تصفح المنتجات
            </Button>
          </Link>
          <Button 
            variant="outline"
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-neutral-800 transition duration-300"
          >
            اشترك في النشرة الإخبارية
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
