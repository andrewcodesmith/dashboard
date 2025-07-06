'use client';

import React, { useState } from 'react';
import FinanceDashboard from './FinanceDashboard';

interface UserData {
  id: string;
  name: string;
  revenue: number[];
  expenses: number[];
  portfolio: number[];
  totalRevenue: number;
  netProfit: number;
  portfolioValue: number;
  expenseBreakdown: number[];
  assetAllocation: number[];
}

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('user1');

  const userData: Record<string, UserData> = {
    user1: {
      id: 'user1',
      name: 'User 1 Dashboard',
      revenue: [65000, 59000, 80000, 81000, 56000, 75000, 90000, 85000, 70000, 95000, 88000, 102000],
      expenses: [45000, 42000, 55000, 58000, 40000, 52000, 65000, 60000, 48000, 68000, 62000, 72000],
      portfolio: [250000, 265000, 245000, 280000, 295000, 275000, 310000, 325000, 305000, 340000, 355000, 375000],
      totalRevenue: 966000,
      netProfit: 295000,
      portfolioValue: 375000,
      expenseBreakdown: [15000, 25000, 35000, 12000, 8000, 5000],
      assetAllocation: [45, 25, 15, 10, 5]
    },
    user2: {
      id: 'user2',
      name: 'User 2 Dashboard',
      revenue: [72000, 68000, 85000, 92000, 78000, 88000, 95000, 91000, 83000, 105000, 98000, 115000],
      expenses: [52000, 48000, 62000, 65000, 55000, 60000, 70000, 68000, 58000, 75000, 72000, 82000],
      portfolio: [320000, 335000, 315000, 350000, 365000, 345000, 380000, 395000, 375000, 410000, 425000, 445000],
      totalRevenue: 1074000,
      netProfit: 347000,
      portfolioValue: 445000,
      expenseBreakdown: [18000, 28000, 42000, 15000, 10000, 7000],
      assetAllocation: [50, 20, 18, 8, 4]
    },
    user3: {
      id: 'user3',
      name: 'User 3 Dashboard',
      revenue: [58000, 52000, 71000, 75000, 48000, 65000, 82000, 78000, 62000, 87000, 81000, 95000],
      expenses: [38000, 35000, 48000, 52000, 32000, 45000, 58000, 55000, 42000, 62000, 58000, 68000],
      portfolio: [180000, 195000, 175000, 210000, 225000, 205000, 240000, 255000, 235000, 270000, 285000, 305000],
      totalRevenue: 854000,
      netProfit: 261000,
      portfolioValue: 305000,
      expenseBreakdown: [12000, 22000, 28000, 9000, 6000, 4000],
      assetAllocation: [40, 30, 20, 7, 3]
    },
    user4: {
      id: 'user4',
      name: 'User 4 Dashboard',
      revenue: [85000, 78000, 102000, 108000, 92000, 98000, 115000, 112000, 95000, 125000, 118000, 135000],
      expenses: [62000, 58000, 75000, 78000, 68000, 72000, 85000, 82000, 70000, 92000, 88000, 98000],
      portfolio: [450000, 465000, 445000, 480000, 495000, 475000, 510000, 525000, 505000, 540000, 555000, 575000],
      totalRevenue: 1263000,
      netProfit: 335000,
      portfolioValue: 575000,
      expenseBreakdown: [22000, 32000, 48000, 18000, 12000, 8000],
      assetAllocation: [55, 18, 12, 10, 5]
    },
    user5: {
      id: 'user5',
      name: 'User 5 Dashboard',
      revenue: [42000, 38000, 55000, 58000, 35000, 48000, 65000, 62000, 45000, 72000, 68000, 82000],
      expenses: [28000, 25000, 38000, 42000, 22000, 35000, 48000, 45000, 32000, 52000, 48000, 58000],
      portfolio: [120000, 135000, 115000, 150000, 165000, 145000, 180000, 195000, 175000, 210000, 225000, 245000],
      totalRevenue: 670000,
      netProfit: 197000,
      portfolioValue: 245000,
      expenseBreakdown: [8000, 15000, 22000, 6000, 4000, 3000],
      assetAllocation: [35, 35, 15, 10, 5]
    }
  };

  const tabs = [
    { id: 'user1', label: 'User 1' },
    { id: 'user2', label: 'User 2' },
    { id: 'user3', label: 'User 3' },
    { id: 'user4', label: 'User 4' },
    { id: 'user5', label: 'User 5' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <FinanceDashboard userData={userData[activeTab]} />
    </div>
  );
};

export default TabNavigation;
