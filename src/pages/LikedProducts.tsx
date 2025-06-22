
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const LikedProducts = () => {
  const [liked, setLiked] = useState([]);

  // Load liked products from localStorage on page load
  useEffect(() => {
    const data = localStorage.getItem("likedProducts");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setLiked(parsed);
      } catch (e) {
        console.error("Invalid likedProducts data in localStorage.");
      }
    }
  }, []);

  // Remove item from liked list
  const removeLike = (id: string) => {
    const updated = liked.filter((product: any) => product.id !== parseInt(id));
    setLiked(updated);
    localStorage.setItem("likedProducts", JSON.stringify(updated));
    
    // Also update wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const updatedWishlist = wishlist.filter((productId: number) => productId !== parseInt(id));
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors mr-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Liked Products</h1>
              <p className="text-slate-600">Your favorite items</p>
            </div>
          </div>
        </div>

        {liked.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-red-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No liked products yet</h3>
            <p className="text-slate-600 mb-6">Start exploring and add products to your favorites!</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {liked.map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg border hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-t-lg" 
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">{product.name}</h2>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-slate-800">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      to={`/product/${product.id}`}
                      className="flex-1"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => removeLike(product.id.toString())}
                      className="bg-red-500 text-white hover:bg-red-600 px-4"
                    >
                      Unlike
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedProducts;
