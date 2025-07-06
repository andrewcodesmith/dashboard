'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FinanceDashboard = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const revenueData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue ($)',
        data: [65000, 59000, 80000, 81000, 56000, 75000, 90000, 85000, 70000, 95000, 88000, 102000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Expenses ($)',
        data: [45000, 42000, 55000, 58000, 40000, 52000, 65000, 60000, 48000, 68000, 62000, 72000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const portfolioData = {
    labels: months,
    datasets: [
      {
        label: 'Portfolio Value ($)',
        data: [250000, 265000, 245000, 280000, 295000, 275000, 310000, 325000, 305000, 340000, 355000, 375000],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const expenseBreakdownData = {
    labels: ['Marketing', 'Operations', 'Salaries', 'Technology', 'Office', 'Other'],
    datasets: [
      {
        data: [15000, 25000, 35000, 12000, 8000, 5000],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const assetAllocationData = {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash', 'Crypto'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Finance Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Revenue vs Expenses</h2>
            <Line data={revenueData} options={chartOptions} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Growth</h2>
            <Bar data={portfolioData} options={chartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Expense Breakdown</h2>
            <Pie data={expenseBreakdownData} options={pieOptions} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asset Allocation</h2>
            <Doughnut data={assetAllocationData} options={pieOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">$966,000</p>
            <p className="text-sm text-gray-500">+12% from last year</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Net Profit</h3>
            <p className="text-3xl font-bold text-blue-600">$295,000</p>
            <p className="text-sm text-gray-500">+18% from last year</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Portfolio Value</h3>
            <p className="text-3xl font-bold text-purple-600">$375,000</p>
            <p className="text-sm text-gray-500">+15% from last year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
