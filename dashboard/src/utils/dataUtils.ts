import { DataPoint, DateRange } from '../types/dashboard';

export const generateTimeSeriesData = (
  baseValue: number,
  variance: number = 0.1,
  trend: number = 0.02
): DataPoint[] => {
  const data: DataPoint[] = [];
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const trendValue = baseValue * (1 + trend * (i / 365));
    const randomVariation = (Math.random() - 0.5) * variance * baseValue;
    const value = Math.max(0, trendValue + randomVariation);
    
    data.push({ date, value });
  }
  
  return data;
};

export const filterDataByDateRange = (
  data: DataPoint[],
  dateRange: DateRange
): DataPoint[] => {
  return data.filter(
    (point) =>
      point.date >= dateRange.startDate && point.date <= dateRange.endDate
  );
};

export const aggregateToMonthly = (data: DataPoint[]): DataPoint[] => {
  const monthlyData = new Map<string, { sum: number; count: number; date: Date }>();
  
  data.forEach((point) => {
    const monthKey = `${point.date.getFullYear()}-${point.date.getMonth()}`;
    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, {
        sum: 0,
        count: 0,
        date: new Date(point.date.getFullYear(), point.date.getMonth(), 1),
      });
    }
    const monthData = monthlyData.get(monthKey)!;
    monthData.sum += point.value;
    monthData.count += 1;
  });
  
  return Array.from(monthlyData.values())
    .map(({ sum, count, date }) => ({
      date,
      value: sum / count,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const formatDateForChart = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const generateDashboardData = () => {
  return {
    revenue: generateTimeSeriesData(75000, 0.15, 0.05),
    expenses: generateTimeSeriesData(55000, 0.12, 0.03),
    portfolio: generateTimeSeriesData(300000, 0.08, 0.08),
    expenseBreakdown: {
      marketing: generateTimeSeriesData(15000, 0.2),
      operations: generateTimeSeriesData(25000, 0.15),
      salaries: generateTimeSeriesData(35000, 0.1),
      technology: generateTimeSeriesData(12000, 0.25),
      office: generateTimeSeriesData(8000, 0.3),
      other: generateTimeSeriesData(5000, 0.4),
    },
  };
};
