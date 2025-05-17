import { Helmet } from 'react-helmet';
import HeroSection from "@/components/home/HeroSection";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSellerProducts from "@/components/home/BestSellerProducts";
import PromotionBanner from "@/components/home/PromotionBanner";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>freelanceos - منصة المنتجات الرقمية</title>
        <meta name="description" content="منصتك الرقمية للتعلم والإبداع. استكشف مجموعة من الكتب الإلكترونية والقوالب المصممة خصيصًا لتعزيز مهاراتك في البرمجة والتصميم." />
      </Helmet>
      
      <HeroSection />
      <CategoryHighlights />
      <FeaturedProducts />
      <BestSellerProducts />
      <PromotionBanner />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Home;
