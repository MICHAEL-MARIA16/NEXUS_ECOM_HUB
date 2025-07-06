import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Account = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserEmail(parsedUser.email || null);
      } catch {
        setUserEmail(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!userEmail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold mb-4">You are not logged in</h2>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-indigo-600 p-3 rounded-full">
            <User className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Logged in as</p>
            <p className="text-indigo-700 font-semibold">{userEmail}</p>
          </div>
        </div>

        {/* Logout button */}
        <Button variant="destructive" onClick={handleLogout} className="w-full mb-3">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        {/* Continue shopping button */}
        <Button
          onClick={() => navigate("/")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          🛍️ Continue Shopping
        </Button>
      </div>
    </div>
  );

};

export default Account;
