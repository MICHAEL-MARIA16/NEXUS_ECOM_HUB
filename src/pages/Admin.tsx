
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import OrdersTable from "@/components/admin/OrdersTable";
import ProductsTable from "@/components/admin/ProductsTable";
import CustomersTable from "@/components/admin/CustomersTable";
import Analytics from "@/components/admin/Analytics";

const Admin = () => {
  // Sample data
  const dashboardStats = {
    totalOrders: 1247,
    totalCustomers: 892,
    totalProducts: 156,
    totalRevenue: 45678
  };

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      products: ["MacBook Pro", "Mouse"],
      total: 1079,
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      products: ["Headphones"],
      total: 199,
      status: "shipped",
      date: "2024-01-14"
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      products: ["Monitor", "Keyboard"],
      total: 699,
      status: "delivered",
      date: "2024-01-14"
    }
  ];

  const products = [
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      price: 1999,
      stock: 45,
      category: "Laptops",
      status: "active"
    },
    {
      id: 2,
      name: "Wireless Gaming Mouse",
      price: 79,
      stock: 200,
      category: "Accessories",
      status: "active"
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 149,
      stock: 0,
      category: "Accessories",
      status: "out_of_stock"
    }
  ];

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      orders: 5,
      totalSpent: 2340,
      joinDate: "2023-12-01"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      orders: 3,
      totalSpent: 890,
      joinDate: "2024-01-05"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      active: "bg-green-100 text-green-800",
      out_of_stock: "bg-red-100 text-red-800"
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardStats stats={dashboardStats} />

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r from-purple-500 to-pink-500 data-[state=active]:text-white">
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-gradient-to-r from-purple-500 to-pink-500 data-[state=active]:text-white">
              Products
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-gradient-to-r from-purple-500 to-pink-500 data-[state=active]:text-white">
              Customers
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r from-purple-500 to-pink-500 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTable orders={recentOrders} getStatusBadge={getStatusBadge} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTable products={products} getStatusBadge={getStatusBadge} />
          </TabsContent>

          <TabsContent value="customers">
            <CustomersTable customers={customers} />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
