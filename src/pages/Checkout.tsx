
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1); // 1: Order Summary, 2: Payment, 3: Success
  const [orderData, setOrderData] = useState({
    orderId: "",
    address: {
      name: "John Doe",
      street: "123 Demo Street",
      city: "Demo City",
      state: "Demo State",
      pincode: "123456",
      phone: "+91 9876543210"
    },
    payment: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: ""
    }
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    
    if (savedCart.length === 0) {
      navigate('/cart');
    }
  }, [navigate]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const generateOrderId = () => {
    return `NEX${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleProceedToPayment = () => {
    setStep(2);
  };

  const handleConfirmPayment = () => {
    const orderId = generateOrderId();
    setOrderData(prev => ({ ...prev, orderId }));
    setStep(3);
    
    // Clear cart after successful order
    localStorage.setItem('cart', JSON.stringify([]));
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${orderId} has been confirmed.`,
    });
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        <header className="bg-gradient-to-r from-slate-800 to-indigo-900 text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link
                to="/cart"
                className="flex items-center space-x-2 text-indigo-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Cart</span>
              </Link>
              <h1 className="ml-8 text-xl font-bold">Order Summary</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">You're almost there!</h2>
            <p className="text-slate-600">Please review your order before placing it.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items ({getTotalItems()} items)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-0">
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{item.name}</h4>
                        <p className="text-slate-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.price}</p>
                        <p className="text-sm text-slate-600">Subtotal: ${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Delivery Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold">{orderData.address.name}</p>
                    <p className="text-slate-600">{orderData.address.street}</p>
                    <p className="text-slate-600">
                      {orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}
                    </p>
                    <p className="text-slate-600">Phone: {orderData.address.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Price Details</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Price ({getTotalItems()} items)</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${Math.round(getTotalPrice() * 0.18)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total Amount</span>
                        <span>${getTotalPrice() + Math.round(getTotalPrice() * 0.18)}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleProceedToPayment}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
        <header className="bg-gradient-to-r from-slate-800 to-indigo-900 text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-2 text-indigo-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Order Summary</span>
              </button>
              <h1 className="ml-8 text-xl font-bold">Payment</h1>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Complete Your Payment</h2>
            <p className="text-amber-600 font-medium">Note: This is a simulated checkout. No actual transaction will occur.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={orderData.payment.cardName}
                    onChange={(e) => setOrderData(prev => ({
                      ...prev,
                      payment: { ...prev.payment, cardName: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={orderData.payment.cardNumber}
                    onChange={(e) => setOrderData(prev => ({
                      ...prev,
                      payment: { ...prev.payment, cardNumber: e.target.value }
                    }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={orderData.payment.expiryDate}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        payment: { ...prev.payment, expiryDate: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={orderData.payment.cvv}
                      onChange={(e) => setOrderData(prev => ({
                        ...prev,
                        payment: { ...prev.payment, cvv: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total to Pay:</span>
                  <span>${getTotalPrice() + Math.round(getTotalPrice() * 0.18)}</span>
                </div>
              </div>

              <Button
                onClick={handleConfirmPayment}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
              >
                Confirm Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 3: Success Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-gradient-to-r from-slate-800 to-indigo-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-indigo-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="ml-8 text-xl font-bold">Order Confirmed</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">✓</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            ✅ Thank you for shopping with Nexus!
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Your order has been placed successfully.
          </p>
        </div>

        <Card className="text-left">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🧾</span>
              <div>
                <span className="font-semibold">Order ID:</span>
                <span className="ml-2 text-indigo-600 font-mono">{orderData.orderId}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-lg">📦</span>
              <div>
                <span className="font-semibold">Status:</span>
                <span className="ml-2 text-amber-600">Pending</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-lg">📍</span>
              <div>
                <span className="font-semibold">Shipping Address:</span>
                <div className="ml-2 text-slate-600">
                  {orderData.address.name}<br />
                  {orderData.address.street}<br />
                  {orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-lg">🕒</span>
              <div>
                <span className="font-semibold">Estimated Delivery:</span>
                <span className="ml-2 text-slate-600">Not Applicable (Demo Only)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-4">
          <p className="text-slate-600">
            You can view or manage your order under "My Orders".
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-amber-500 text-white px-2 py-1 rounded text-sm font-bold">
                DEMO MODE
              </span>
            </div>
            <p className="text-amber-800 text-sm">
              This is a simulated order for demonstration purposes only. No real items will be delivered.
            </p>
          </div>
        </div>

        <div className="mt-8 space-x-4">
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
