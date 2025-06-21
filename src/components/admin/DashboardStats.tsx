
import { BarChart3, Users, Package, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatsProps {
  stats: {
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    totalRevenue: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Orders</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Customers</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Products</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-3xl font-bold text-slate-900">${stats.totalRevenue}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
