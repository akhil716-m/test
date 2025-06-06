export interface DeviationType {
  category_id: string;
  title: string;
  description: string;
  amount: number;
  trend_pct: number;
  severity: 'high' | 'medium' | 'low';
}

export interface KPIType {
  amount: number;
  trend_pct: number;
}

export interface TrendDataPoint {
  date: string;
  value: number;
}

export interface SettlementType {
  net_settled: number;
  total_revenue: number;
  total_deductions: number;
  total_additions: number;
}

export interface SettlementComponentItem {
  label: string;
  amount: number;
  trend_pct?: number;
}

export interface SettlementComponentsType {
  deductions: SettlementComponentItem[];
  additions: SettlementComponentItem[];
}

export interface BreakdownItem {
  id: string;
  label: string;
  amount: number;
  trend_pct: number;
}

export interface BreakdownType {
  dimension: string;
  items: BreakdownItem[];
}

export interface DashboardFilters {
  dateRange: {
    start: Date;
    end: Date;
  };
  breakdownDimension: string;
}

export interface DashboardData {
  deviations: DeviationType[];
  kpis: {
    total_sale: KPIType;
    total_cost: KPIType;
    cost_pct_gmv: KPIType;
  };
  trend: TrendDataPoint[];
  settlement: SettlementType;
  settlement_components: SettlementComponentsType;
  breakdown: BreakdownType;
} 