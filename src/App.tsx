import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Category from "./components/Category";
import Category2 from "./components/Category2";
import Services from "./components/Services";
import Banner from "./components/Banner";
import Products from "./components/Products";
import headphone from "./assets/website/ear.jpg";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import TopProducts from "./components/TopProduct";
import Blogs from "./components/Blog";
import Partnership from "./components/Partnership";
import Footer from "./components/Footer";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSummary from "./pages/OrderSummary";
import { ProductsData } from "./components/Products";
import ProductDetails from "./pages/ProductDetails";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database.types";

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);


const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "30 Jan to 10 Feb",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4: "Welcome and take our best tech product",
  bgColor: "#f42c37",
};


const App = () => {
  fetchData();

  async function fetchData() {
    const { data, error } = await supabase
    .from('products')
    .select('*, price(title, image)');
    if (error) {
      console.log(error);
    }
    console.log(data);
    return data;
  }

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Navbar 
       searchTerm={searchTerm} 
       setSearchTerm={setSearchTerm} 
       products={ProductsData}
       />
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={
          <main 
          className="
            pt-16 sm:pt-20
            px-4 sm:px-6 lg:px-8
            max-w-7xl mx-auto
            space-y-16 sm:space-y-20">
            <Hero />
            <Category />
            <Category2 />
            <Services />
            <Banner data={BannerData} />
            <Products searchTerm={searchTerm} />
            <TopProducts />
            <Blogs />
            <Partnership />
            <Footer />
          </main>
        } />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/product/:id" element={<ProductDetails />} />


      </Routes>
    </>
  );
};

export default App;
