'use client';

import React, { useState, useMemo } from 'react';
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
import DateRangePicker from './DateRangePicker';
import { DateRange } from '../types/dashboard';
import {
  generateDashboardData,
  filterDataByDateRange,
  aggregateToMonthly,
  formatDateForChart,
} from '../utils/dataUtils';

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
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endDate = new Date(today.getFullYear(), today.getMonth(), 0);
    return { startDate, endDate };
  });

  const baseData = useMemo(() => generateDashboardData(), []);

  const filteredData = useMemo(() => {
    const revenueFiltered = filterDataByDateRange(baseData.revenue, dateRange);
    const expensesFiltered = filterDataByDateRange(baseData.expenses, dateRange);
    const portfolioFiltered = filterDataByDateRange(baseData.portfolio, dateRange);

    const revenueMonthly = aggregateToMonthly(revenueFiltered);
    const expensesMonthly = aggregateToMonthly(expensesFiltered);
    const portfolioMonthly = aggregateToMonthly(portfolioFiltered);

    const expenseBreakdownFiltered = Object.entries(baseData.expenseBreakdown).map(
      ([category, data]) => {
        const filtered = filterDataByDateRange(data, dateRange);
        const total = filtered.reduce((sum, point) => sum + point.value, 0);
        return { category, total };
      }
    );

    return {
      revenue: revenueMonthly,
      expenses: expensesMonthly,
      portfolio: portfolioMonthly,
      expenseBreakdown: expenseBreakdownFiltered,
    };
  }, [baseData, dateRange]);

  const revenueData = {
    labels: filteredData.revenue.map((point) => formatDateForChart(point.date)),
    datasets: [
      {
        label: 'Revenue ($)',
        data: filteredData.revenue.map((point) => point.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Expenses ($)',
        data: filteredData.expenses.map((point) => point.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const portfolioData = {
    labels: filteredData.portfolio.map((point) => formatDateForChart(point.date)),
    datasets: [
      {
        label: 'Portfolio Value ($)',
        data: filteredData.portfolio.map((point) => point.value),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const expenseBreakdownData = {
    labels: filteredData.expenseBreakdown.map((item) => item.category),
    datasets: [
      {
        data: filteredData.expenseBreakdown.map((item) => item.total),
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

  const totalRevenue = filteredData.revenue.reduce((sum, point) => sum + point.value, 0);
  const totalExpenses = filteredData.expenses.reduce((sum, point) => sum + point.value, 0);
  const netProfit = totalRevenue - totalExpenses;
  const currentPortfolioValue = filteredData.portfolio[filteredData.portfolio.length - 1]?.value || 0;

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
        
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
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
            <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">For selected period</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Net Profit</h3>
            <p className="text-3xl font-bold text-blue-600">${netProfit.toLocaleString()}</p>
            <p className="text-sm text-gray-500">For selected period</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Portfolio Value</h3>
            <p className="text-3xl font-bold text-purple-600">${currentPortfolioValue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Current value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
