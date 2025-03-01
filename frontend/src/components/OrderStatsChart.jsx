import React, { useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell, Area, AreaChart
} from 'recharts';
import {
  ChartSpline
} from "lucide-react";
const OrderStatsChart = ({ orders }) => {
  // Process data for different charts
  const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return { monthly: [], categoryPie: [], spendingTrend: [] };

    // For monthly order counts
    const monthlyData = {};
    
    // For category distribution (veg vs non-veg)
    let vegCount = 0;
    let nonVegCount = 0;
    
    // For spending trend
    const spendingByDate = {};

    // Helper function to detect vegetarian items
    const isVegetarian = (foodName) => {
      const vegetarianKeywords = ["veg", "paneer", "jeera", "aloo", "mushroom", "gobi", "dal", "palak"];
      return vegetarianKeywords.some(keyword => foodName.toLowerCase().includes(keyword));
    };

    // Process orders
    orders.forEach(order => {
      // Process order date for monthly tracking
      const orderDate = new Date(order.orderDate);
      const monthYear = orderDate.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
      
      // Update monthly counts
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1;
      
      // Update spending trend
      const dateStr = orderDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
      spendingByDate[dateStr] = (spendingByDate[dateStr] || 0) + order.totalAmount;
      
      // Count veg and non-veg items
      order.items.forEach(item => {
        if (isVegetarian(item.name)) {
          vegCount += item.quantity;
        } else {
          nonVegCount += item.quantity;
        }
      });
    });

    // Format data for charts
    const monthly = Object.entries(monthlyData)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));
    
    const categoryPie = [
      { name: 'Vegetarian', value: vegCount, color: '#4ade80' },
      { name: 'Non-Vegetarian', value: nonVegCount, color: '#f87171' }
    ];
    
    const spendingTrend = Object.entries(spendingByDate)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

    return { monthly, categoryPie, spendingTrend };
  }, [orders]);

  if (!orders || orders.length === 0) {
    return <div className="text-center p-6 text-gray-500">No order data to display</div>;
  }

  const COLORS = ['#4ade80', '#f87171', '#60a5fa', '#fbbf24', '#a78bfa'];

  return (
    <div className="bg-white rounded-xl cursor-pointer shadow-sm p-6 border border-gray-100 space-y-8">
      {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Analytics</h2> */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ChartSpline className="w-5 h-5 text-green-500" />
              Order Analytics
            </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending Trend Chart */}
        <div className="bg-gray-50 cursor-pointer rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-700 mb-3">Spending Trend</h3>
          <ResponsiveContainer 
          className="cursor-pointer"
          width="100%" height={250}>
            <AreaChart
              data={chartData.spendingTrend}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="amount" 
                name="Spending" 
                stroke="#10b981" 
                fill="#d1fae5" 
                activeDot={{ r: 8 }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Food Preference Distribution */}
        <div className="bg-gray-50 cursor-pointer rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-700 mb-3">Food Preference</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData.categoryPie}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.categoryPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Items']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Monthly Orders Bar Chart */}
        <div className="bg-gray-50 rounded-lg p-4 lg:col-span-2">
          <h3 className="text-md font-medium text-gray-700 mb-3">Monthly Order History</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData.monthly}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [value, 'Orders']} />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Orders" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderStatsChart;