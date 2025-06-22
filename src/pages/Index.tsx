import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, Star, Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import UserDropdown from "@/components/UserDropdown";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    const savedLiked = localStorage.getItem('likedProducts');
    if (savedLiked) {
      setLikedProducts(JSON.parse(savedLiked));
    }

    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const products = [
    {
      id: 1,
      name: "Canon EOS R5 Camera",
      price: 3899,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 245,
      category: "Electronics",
      description: "Professional mirrorless camera with 45MP sensor",
      stock: 4
    },
    {
      id: 2,
      name: "Apple MacBook Pro 16\"",
      price: 2499,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 189,
      category: "Electronics",
      description: "Powerful laptop for professionals",
      stock: 7
    },
    {
      id: 3,
      name: "Sony WH-1000XM4 Headphones",
      price: 349,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 432,
      category: "Electronics",
      description: "Industry-leading noise canceling headphones",
      stock: 12
    },
    {
      id: 4,
      name: "Nike Air Max 270",
      price: 150,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 567,
      category: "Fashion",
      description: "Comfortable and stylish running shoes",
      stock: 23
    },
    {
      id: 5,
      name: "Samsung 65\" QLED TV",
      price: 1299,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 298,
      category: "Electronics",
      description: "4K QLED Smart TV with vibrant colors",
      stock: 8
    },
    {
      id: 6,
      name: "Adidas Ultraboost 22",
      price: 180,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 743,
      category: "Fashion",
      description: "Premium running shoes with boost technology",
      stock: 15
    }
  ];

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const toggleLike = (productId: string) => {
    const productIdStr = productId.toString();
    let updatedLiked;
    
    if (likedProducts.includes(productIdStr)) {
      updatedLiked = likedProducts.filter(id => id !== productIdStr);
    } else {
      updatedLiked = [...likedProducts, productIdStr];
    }
    
    setLikedProducts(updatedLiked);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLiked));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    setCurrentUser(null);
    navigate('/');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/favicon.ico.png" 
                alt="Nexus Logo" 
                className="h-8 w-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-2xl font-bold text-white">Nexus</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Products</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Categories</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">About</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Contact</a>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>

              {/* Liked Products */}
              <Link to="/liked" className="relative text-white hover:text-gray-300 transition-colors">
                <Heart className="h-6 w-6" />
                {likedProducts.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
                    {likedProducts.length}
                  </Badge>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative text-white hover:text-gray-300 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
                    {totalCartItems}
                  </Badge>
                )}
              </Link>

              {/* User Account */}
              {currentUser ? (
                <UserDropdown userEmail={currentUser} onLogout={handleLogout} />
              ) : (
                <Link to="/login" className="text-white hover:text-gray-300 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-gray-300 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Products</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Categories</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">About</a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">Contact</a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            All Things, One Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover premium products across all categories. From cutting-edge electronics to fashion essentials - everything you need in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
              Explore Products
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Products</h2>
            <p className="text-gray-300 text-lg">Handpicked items from our premium collection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleLike(product.id.toString())}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedProducts.includes(product.id.toString())
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className="h-4 w-4" fill={likedProducts.includes(product.id.toString()) ? 'currentColor' : 'none'} />
                    </button>
                    <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                      {product.stock} left in stock
                    </Badge>
                  </div>
                  <div className="p-6">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-300 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-300 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white ml-2 text-sm">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">${product.price}</span>
                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Shop by Category</h2>
            <p className="text-gray-300 text-lg">Explore our diverse range of product categories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((category, index) => (
              <div key={category} className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">
                    {index === 0 ? '📱' : index === 1 ? '👕' : index === 2 ? '🏠' : '⚽'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
                <p className="text-gray-300 text-sm">Discover premium {category.toLowerCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">Get the latest updates on new products and exclusive deals</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/favicon.ico.png" 
                  alt="Nexus Logo" 
                  className="h-8 w-8"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h3 className="text-xl font-bold text-white">Nexus</h3>
              </div>
              <p className="text-gray-400">All Things, One Platform. Your ultimate destination for premium products.</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
