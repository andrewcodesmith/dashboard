export interface DataPoint {
  date: Date;
  value: number;
  label?: string;
}

export interface ChartDataset {
  label: string;
  data: DataPoint[];
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
  borderWidth?: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export type DateRangePreset = 'lastMonth' | 'lastQuarter' | 'custom';
