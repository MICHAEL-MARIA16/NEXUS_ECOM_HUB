import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Star, Heart, User, Menu, X, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  discount: number;
  category: string;
  brand: string;
  inStock: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const categories = ["All", "Laptops", "Smartphones", "Headphones", "Tablets", "Cameras"];
  
  const products: Product[] = [
    {
      id: 1,
      name: "MacBook Pro 16-inch M2",
      price: 1999,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 324,
      discount: 13,
      category: "Laptops",
      brand: "Apple",
      inStock: true
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 567,
      discount: 8,
      category: "Smartphones",
      brand: "Apple",
      inStock: true
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 892,
      discount: 25,
      category: "Headphones",
      brand: "Sony",
      inStock: true
    },
    {
      id: 4,
      name: "iPad Pro 12.9-inch",
      price: 899,
      originalPrice: 1099,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 234,
      discount: 18,
      category: "Tablets",
      brand: "Apple",
      inStock: true
    },
    {
      id: 5,
      name: "Canon EOS R5 Camera",
      price: 2499,
      originalPrice: 2899,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 156,
      discount: 14,
      category: "Cameras",
      brand: "Canon",
      inStock: true
    },
    {
      id: 6,
      name: "Samsung Galaxy S24 Ultra",
      price: 999,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 445,
      discount: 17,
      category: "Smartphones",
      brand: "Samsung",
      inStock: true
    }
  ];

  useEffect(() => {
    updateCartCount();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, sortBy]);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
    setCartCount(count);
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filtered = filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    updateCartCount();
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-indigo-900 text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/53edf2d7-993b-41c1-979b-52b9fb1311e3.png" 
                alt="Nexus Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Nexus
                </h1>
                <p className="text-xs text-indigo-200">Premium Electronics</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border-white/20 text-white placeholder-indigo-200 focus:bg-white focus:text-slate-800 focus:placeholder-slate-400 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-indigo-200 hover:text-white hover:bg-white/10">
                <User className="h-5 w-5 mr-2" />
                Account
              </Button>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" className="text-indigo-200 hover:text-white hover:bg-white/10">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                className="md:hidden text-indigo-200 hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border-white/20 text-white placeholder-indigo-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-slate-200 bg-clip-text text-transparent">
              Premium Electronics
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Discover the latest technology and premium electronics with unbeatable prices and exceptional quality.
          </p>
          <Button
            onClick={scrollToProducts}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Shopping
          </Button>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white shadow-sm border-b" id="products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Filter className="h-4 w-4 text-slate-600 flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white flex-shrink-0" 
                    : "text-slate-600 hover:text-indigo-600 flex-shrink-0"}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-slate-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
            </h2>
            <p className="text-lg text-slate-600">
              {filteredProducts.length} products found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No products found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-0 shadow-lg bg-white"
                >
                  <CardContent className="p-0">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {product.discount}% OFF
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              wishlist.includes(product.id)
                                ? "text-red-500 fill-current"
                                : "text-slate-600"
                            }`}
                          />
                        </button>
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-600 ml-2">
                            ({product.reviews})
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-2xl font-bold text-slate-800">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-slate-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </Link>

                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/lovable-uploads/53edf2d7-993b-41c1-979b-52b9fb1311e3.png" 
                  alt="Nexus Logo" 
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-xl font-bold">Nexus</h3>
              </div>
              <p className="text-indigo-200">
                Your trusted partner for premium electronics and cutting-edge technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="#" className="hover:text-white transition-colors">Laptops</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smartphones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Headphones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cameras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-200">
            <p>&copy; 2024 Nexus Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
