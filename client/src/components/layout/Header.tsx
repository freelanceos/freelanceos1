import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import SearchBar from "./SearchBar";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { cartCount, openCart } = useCart();
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <span className="text-2xl font-bold text-primary cursor-pointer">freelanceos</span>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 space-x-reverse">
              <li>
                <Link href="/">
                  <span className={`font-medium cursor-pointer ${location === '/' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                    الرئيسية
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className={`font-medium cursor-pointer ${location === '/products' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                    المنتجات
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products/category/programming">
                  <span className={`font-medium cursor-pointer ${location.includes('/products/category/programming') ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                    الكتب الإلكترونية
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products/category/design-templates">
                  <span className={`font-medium cursor-pointer ${location.includes('/products/category/design-templates') ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                    القوالب
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button 
              onClick={toggleSearchBar}
              className="text-neutral-600 hover:text-primary focus:outline-none"
              aria-label="بحث"
            >
              <i className="fas fa-search text-lg"></i>
            </button>
            <button 
              onClick={openCart}
              className="text-neutral-600 hover:text-primary focus:outline-none relative"
              aria-label="سلة التسوق"
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -left-2 bg-secondary text-neutral-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="text-neutral-600 hover:text-primary focus:outline-none hidden md:block">
              <i className="fas fa-user text-lg"></i>
            </button>
            <button 
              onClick={toggleMobileMenu}
              className="text-neutral-600 md:hidden focus:outline-none"
              aria-label="القائمة"
            >
              <i className={`fas ${showMobileMenu ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${showMobileMenu ? 'block' : 'hidden'} bg-white border-t border-neutral-200 py-4`}>
        <div className="container mx-auto px-4">
          <ul className="space-y-3">
            <li>
              <Link href="/">
                <span className={`block font-medium cursor-pointer ${location === '/' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  الرئيسية
                </span>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <span className={`block font-medium cursor-pointer ${location === '/products' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  المنتجات
                </span>
              </Link>
            </li>
            <li>
              <Link href="/products/category/programming">
                <span className={`block font-medium cursor-pointer ${location.includes('/products/category/programming') ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  الكتب الإلكترونية
                </span>
              </Link>
            </li>
            <li>
              <Link href="/products/category/design-templates">
                <span className={`block font-medium cursor-pointer ${location.includes('/products/category/design-templates') ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  القوالب
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Search Bar */}
      {showSearchBar && <SearchBar onClose={toggleSearchBar} />}
      
      {/* Cart Drawer */}
      <CartDrawer />
    </header>
  );
};

export default Header;
