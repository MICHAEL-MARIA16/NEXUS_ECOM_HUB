
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Orders by Product</CardTitle>
          <CardDescription>Most popular products by order volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">MacBook Pro</span>
              <span className="text-sm text-slate-500">45 orders</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Headphones</span>
              <span className="text-sm text-slate-500">32 orders</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '64%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Monitor</span>
              <span className="text-sm text-slate-500">28 orders</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '56%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Customers by total spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-sm text-slate-500">$2,340</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Jane Smith</span>
              <span className="text-sm text-slate-500">$890</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bob Johnson</span>
              <span className="text-sm text-slate-500">$699</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
