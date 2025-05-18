import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { CartProvider } from "@/context/CartContext";

import contact from "@/pages/contact";

import Home from "@/pages/Home";

import ProductList from "@/pages/ProductList";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import OrderTracking from "@/pages/OrderTracking";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={contact} />
      <Route path="/products" component={ProductList} />
      <Route path="/products/category/:slug" component={ProductList} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation/:id" component={OrderConfirmation} />
      <Route path="/order-tracking/:id" component={OrderTracking} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
