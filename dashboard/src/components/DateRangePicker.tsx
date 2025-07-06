'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRange, DateRangePreset } from '../types/dashboard';

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateRangeChange,
}) => {
  const [preset, setPreset] = useState<DateRangePreset>('lastMonth');

  const handlePresetChange = (newPreset: DateRangePreset) => {
    setPreset(newPreset);
    const today = new Date();
    let startDate: Date;
    let endDate = today;

    switch (newPreset) {
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'lastQuarter':
        const currentQuarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), (currentQuarter - 1) * 3, 1);
        endDate = new Date(today.getFullYear(), currentQuarter * 3, 0);
        break;
      default:
        return;
    }

    onDateRangeChange({ startDate, endDate });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Date Range Filter</h3>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => handlePresetChange('lastMonth')}
            className={`px-4 py-2 rounded ${preset === 'lastMonth' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Last Month
          </button>
          <button
            onClick={() => handlePresetChange('lastQuarter')}
            className={`px-4 py-2 rounded ${preset === 'lastQuarter' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Last Quarter
          </button>
          <button
            onClick={() => setPreset('custom')}
            className={`px-4 py-2 rounded ${preset === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Custom Range
          </button>
        </div>
        
        {preset === 'custom' && (
          <div className="flex gap-2 items-center">
            <DatePicker
              selected={dateRange.startDate}
              onChange={(date) => date && onDateRangeChange({ ...dateRange, startDate: date })}
              selectsStart
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              className="px-3 py-2 border rounded"
              placeholderText="Start Date"
            />
            <span>to</span>
            <DatePicker
              selected={dateRange.endDate}
              onChange={(date) => date && onDateRangeChange({ ...dateRange, endDate: date })}
              selectsEnd
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              minDate={dateRange.startDate}
              className="px-3 py-2 border rounded"
              placeholderText="End Date"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
