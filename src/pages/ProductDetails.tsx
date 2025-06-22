
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
  description?: string;
  features?: string[];
  specifications?: { [key: string]: string };
  images?: string[];
}

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  // All products data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "MacBook Pro 16-inch M2",
      price: 1999,
      originalPrice: 2299,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
      rating: 4.8,
      reviews: 324,
      discount: 13,
      category: "Laptops",
      brand: "Apple",
      inStock: true,
      description: "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro or M2 Max chip — the next generation of Apple silicon — MacBook Pro takes pro performance to the next level.",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"
      ],
      features: [
        "Apple M2 Pro chip with 12-core CPU",
        "19-core GPU for graphics-intensive tasks",
        "32GB unified memory",
        "1TB SSD storage",
        "16.2-inch Liquid Retina XDR display",
        "Up to 22 hours battery life"
      ],
      specifications: {
        "Display": "16.2-inch Liquid Retina XDR",
        "Processor": "Apple M2 Pro chip",
        "Memory": "32GB unified memory",
        "Storage": "1TB SSD",
        "Graphics": "19-core GPU",
        "Battery": "Up to 22 hours"
      }
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
      rating: 4.9,
      reviews: 567,
      discount: 8,
      category: "Smartphones",
      brand: "Apple",
      inStock: true,
      description: "The iPhone 15 Pro Max is the ultimate iPhone with powerful A17 Pro chip, titanium design, and advanced camera system.",
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"
      ],
      features: [
        "A17 Pro chip with 6-core GPU",
        "Titanium design",
        "Pro camera system with 48MP main",
        "Action Button",
        "USB-C connector",
        "6.7-inch Super Retina XDR display"
      ],
      specifications: {
        "Display": "6.7-inch Super Retina XDR",
        "Processor": "A17 Pro chip",
        "Storage": "256GB",
        "Camera": "48MP Pro camera system",
        "Battery": "Up to 29 hours video playback",
        "Material": "Titanium"
      }
    }
    // Add more products as needed...
  ];

  useEffect(() => {
    if (id) {
      const foundProduct = allProducts.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Fallback to default product structure for products not in detailed list
        const basicProduct: Product = {
          id: parseInt(id),
          name: getProductNameById(parseInt(id)),
          price: getProductPriceById(parseInt(id)),
          originalPrice: getProductOriginalPriceById(parseInt(id)),
          image: getProductImageById(parseInt(id)),
          rating: 4.5,
          reviews: 100,
          discount: 10,
          category: "Electronics",
          brand: "Premium",
          inStock: true,
          description: "High-quality electronic product with premium features and excellent performance.",
          images: [getProductImageById(parseInt(id))],
          features: [
            "Premium build quality",
            "Advanced technology",
            "Excellent performance",
            "User-friendly design",
            "Reliable warranty"
          ],
          specifications: {
            "Brand": "Premium",
            "Model": getProductNameById(parseInt(id)),
            "Warranty": "1 Year",
            "Color": "Multiple options available"
          }
        };
        setProduct(basicProduct);
      }
    }

    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(parseInt(id || '0')));
  }, [id]);

  // Helper functions to get basic product data
  const getProductNameById = (productId: number): string => {
    const productNames: { [key: number]: string } = {
      1: "MacBook Pro 16-inch M2",
      2: "iPhone 15 Pro Max",
      3: "Sony WH-1000XM5 Headset",
      4: "iPad Pro 12.9-inch",
      5: "Canon EOS R5 Camera",
      6: "Samsung Galaxy S24 Ultra",
      7: "Dell XPS 15 Laptop",
      8: "PlayStation 5 Console",
      9: "Apple Watch Series 9",
      10: "Bose SoundLink Flex Speaker",
      11: "Microsoft Surface Pro 9",
      12: "AirPods Pro 2nd Gen",
      14: "Samsung Galaxy Watch 6",
      15: "JBL Charge 5 Speaker",
      16: "Google Pixel 8 Pro",
      17: "Samsung Galaxy Buds2 Pro",
      18: "OnePlus 12 Pro",
      19: "Anker PowerCore 26800",
      20: "Garmin Venu 3",
      21: "Logitech MX Master 3S"
    };
    return productNames[productId] || "Premium Product";
  };

  const getProductPriceById = (productId: number): number => {
    const productPrices: { [key: number]: number } = {
      1: 1999, 2: 1199, 3: 299, 4: 899, 5: 2499, 6: 999, 7: 1299, 8: 499, 9: 399, 10: 149,
      11: 999, 12: 249, 14: 329, 15: 179, 16: 899, 17: 199, 18: 899, 19: 65, 20: 449, 21: 99
    };
    return productPrices[productId] || 299;
  };

  const getProductOriginalPriceById = (productId: number): number => {
    const productOriginalPrices: { [key: number]: number } = {
      1: 2299, 2: 1299, 3: 399, 4: 1099, 5: 2899, 6: 1199, 7: 1599, 8: 599, 9: 449, 10: 199,
      11: 1199, 12: 299, 14: 399, 15: 229, 16: 999, 17: 229, 18: 999, 19: 79, 20: 499, 21: 119
    };
    return productOriginalPrices[productId] || 399;
  };

  const getProductImageById = (productId: number): string => {
    const productImages: { [key: number]: string } = {
      1: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
      2: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
      3: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      4: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
      5: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64b?w=600&h=600&fit=crop",
      6: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      7: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
      8: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop",
      9: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&h=600&fit=crop",
      10: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
      11: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
      12: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop",
      14: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      15: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=600&fit=crop",
      16: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop",
      17: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
      18: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop",
      19: "https://images.unsplash.com/photo-1609592800696-13d2332e3d68?w=600&h=600&fit=crop",
      20: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop",
      21: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop"
    };
    return productImages[productId] || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop";
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const buyNow = () => {
    addToCart();
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to checkout page...",
    });
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    
    if (isWishlisted) {
      newWishlist = wishlist.filter((id: number) => id !== product.id);
      // Remove from likedProducts
      const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
      const updatedLiked = likedProducts.filter((p: any) => p.id !== product.id);
      localStorage.setItem('likedProducts', JSON.stringify(updatedLiked));
    } else {
      newWishlist = [...wishlist, product.id];
      // Add to likedProducts
      const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
      const existingProduct = likedProducts.find((p: any) => p.id === product.id);
      if (!existingProduct) {
        likedProducts.push(product);
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
      }
    }
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
              <img
                src={product.images ? product.images[selectedImage] : product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-300'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg text-slate-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-slate-800">
                ${product.price}
              </span>
              <span className="text-xl text-slate-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {product.discount}% OFF
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-slate-800">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={addToCart}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={buyNow}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                onClick={toggleWishlist}
                className="p-3"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-slate-800">Free delivery by tomorrow</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-slate-800">1 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-blue-600" />
                <span className="text-slate-800">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Description</h3>
                <p className="text-slate-600 mb-4">{product.description}</p>
                {product.features && (
                  <>
                    <h4 className="font-semibold text-slate-800 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-slate-600">• {feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium text-slate-800">{key}:</span>
                      <span className="text-slate-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
