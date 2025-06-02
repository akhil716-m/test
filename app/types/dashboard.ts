export interface DeviationType {
  fee_category: string;
  fee_type: string;
  amount: number;
  deviation_pct: number;
  category_id: number;
}

export interface KPIType {
  amount: number;
  trend_pct: number;
}

export interface TrendDataPoint {
  period: string;
  cost_pct: number;
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
  processorId?: string[];
  businessUnitId?: string[];
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