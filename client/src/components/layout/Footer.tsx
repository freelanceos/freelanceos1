import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">freelanceos</h3>
            <p className="text-neutral-400 mb-4">منصتك الرقمية للتعلم والإبداع في مجالات البرمجة والتصميم.</p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="فيسبوك">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="تويتر">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="انستجرام">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="لينكد إن">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-neutral-400 hover:text-white cursor-pointer">الصفحة الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="text-neutral-400 hover:text-white cursor-pointer">تصفح المنتجات</span>
                </Link>
              </li>
              <li>
                <Link href="/products/category/programming">
                  <span className="text-neutral-400 hover:text-white cursor-pointer">الكتب الإلكترونية</span>
                </Link>
              </li>
              <li>
                <Link href="/products/category/design-templates">
                  <span className="text-neutral-400 hover:text-white cursor-pointer">القوالب</span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">العروض الخاصة</a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">الدعم</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white">الأسئلة الشائعة</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">سياسة الاسترجاع</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">شروط الاستخدام</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">اتصل بنا</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">النشرة الإخبارية</h4>
            <p className="text-neutral-400 mb-4">اشترك للحصول على آخر العروض والمنتجات الجديدة.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="البريد الإلكتروني" 
                  className="bg-neutral-800 text-white px-4 py-2 rounded-r-md focus:outline-none flex-grow" 
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white px-4 py-2 rounded-l-md hover:bg-primary-dark focus:outline-none"
                >
                  اشتراك
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-neutral-500">
          <p>© 2023 freelanceos. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
