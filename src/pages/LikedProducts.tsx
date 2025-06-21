// src/pages/LikedProducts.tsx
import { useEffect, useState } from "react";

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
    const updated = liked.filter((product: any) => product.id !== id);
    setLiked(updated);
    localStorage.setItem("likedProducts", JSON.stringify(updated));
  };

  return (
    <div className="p-6 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Liked Products</h1>

      {liked.length === 0 ? (
        <p className="text-center text-gray-500">You haven't liked any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liked.map((product: any) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-4" />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-lg text-green-600 font-bold">${product.price}</p>
              <button
                onClick={() => removeLike(product.id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Unlike
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedProducts;
