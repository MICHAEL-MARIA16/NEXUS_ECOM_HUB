
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  // Sample products data
  const products = [
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      price: 1999,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 324,
      discount: 13
    },
    {
      id: 2,
      name: "Wireless Gaming Mouse",
      price: 79,
      originalPrice: 99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 156,
      discount: 20
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 149,
      originalPrice: 189,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      discount: 21
    },
    {
      id: 4,
      name: "4K Gaming Monitor",
      price: 549,
      originalPrice: 699,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 67,
      discount: 21
    },
    {
      id: 5,
      name: "Noise-Cancelling Headphones",
      price: 199,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 203,
      discount: 20
    },
    {
      id: 6,
      name: "Smartphone Pro",
      price: 899,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 445,
      discount: 10
    }
  ];

  const addToCart = (productId: number) => {
    setCartItems(prev => prev + 1);
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nexus
                </h1>
                <p className="text-xs text-gray-500 -mt-1">All Things One Place</p>
              </div>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/login" className="flex items-center space-x-1 text-slate-700 hover:text-purple-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-slate-700 hover:text-purple-600 cursor-pointer transition-colors" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-12 py-2"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Link to="/login" className="flex items-center space-x-2 text-slate-700 hover:text-purple-600">
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <div className="flex items-center space-x-2 text-slate-700">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cartItems})</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-pink-300">Nexus</span>
            </h2>
            <p className="text-xl md:text-2xl mb-4 text-purple-100">All Things, One Platform</p>
            <p className="text-lg mb-8 text-purple-200 max-w-2xl mx-auto">
              Discover amazing products, unbeatable prices, and exceptional service. Your one-stop destination for everything you need.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Featured Products</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our curated selection of top-quality products at amazing prices
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      {product.discount}% OFF
                    </div>
                    <button className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">
                      <Heart className="h-4 w-4 text-slate-600 hover:text-pink-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-slate-800">
                        ${product.price}
                      </span>
                      <span className="text-sm text-slate-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-slate-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Why Choose Nexus?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-2">Easy Shopping</h4>
              <p className="text-slate-600">Intuitive interface makes shopping a breeze</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-2">Top Quality</h4>
              <p className="text-slate-600">Only the best products from trusted sellers</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-2">Great Service</h4>
              <p className="text-slate-600">24/7 customer support and fast delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  </div>
                </div>
                <span className="text-xl font-bold">Nexus</span>
              </div>
              <p className="text-slate-400">All Things, One Platform</p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="#" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Returns</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Shipping</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="#" className="hover:text-white transition-colors">Facebook</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Instagram</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
