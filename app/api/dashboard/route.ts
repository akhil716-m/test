import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const processorId = searchParams.get('processor_id');
    const businessUnitId = searchParams.get('business_unit_id');
    const breakdownDimension = searchParams.get('breakdown_dimension') || 'card_networks';

    // For now, return mock data
    // In production, this would fetch from Supabase tables
    return NextResponse.json({
      deviations: [
        {
          fee_category: 'EIRF Fee',
          fee_type: 'Interchange Fee',
          amount: 736.20,
          deviation_pct: 23,
          category_id: 1,
        },
        {
          fee_category: 'Network Access Fee',
          fee_type: 'Network Fee',
          amount: 542.80,
          deviation_pct: -15,
          category_id: 2,
        },
        {
          fee_category: 'Processing Fee',
          fee_type: 'Processor cost',
          amount: 328.50,
          deviation_pct: 12,
          category_id: 3,
        },
      ],
      kpis: {
        total_sale: { amount: 345000, trend_pct: 23.45 },
        total_cost: { amount: 3300, trend_pct: 23.45 },
        cost_pct_gmv: { amount: 3.84, trend_pct: 0.45 },
      },
      trend: [
        { period: 'Jan 24', cost_pct: 1.6 },
        { period: 'Feb 24', cost_pct: 1.2 },
        { period: 'Mar 24', cost_pct: 2.0 },
        { period: 'Apr 24', cost_pct: 1.8 },
        { period: 'May 24', cost_pct: 1.5 },
        { period: 'Jun 24', cost_pct: 1.9 },
      ],
      settlement: {
        net_settled: 10000,
        total_revenue: 120000,
        total_deductions: 20000,
        total_additions: 10000,
      },
      settlement_components: {
        deductions: [
          { label: 'Total Processing cost', amount: 12000 },
          { label: 'Refunds', amount: 5000 },
          { label: 'Chargebacks', amount: 3000 },
        ],
        additions: [
          { label: 'Return of Overcharged', amount: 7000 },
          { label: 'Discounts from PSPs', amount: 3000 },
        ],
      },
      breakdown: {
        dimension: breakdownDimension,
        items: [
          { id: 'credit', label: 'Credit', amount: 636.20, trend_pct: 8 },
          { id: 'infinite', label: 'Infinite', amount: 432.50, trend_pct: -8 },
          { id: 'rewards', label: 'Rewards', amount: 321.30, trend_pct: 12 },
          { id: 'signature', label: 'Signature', amount: 289.80, trend_pct: -5 },
          { id: 'silver', label: 'Silver Preferred', amount: 198.40, trend_pct: 3 },
        ],
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 