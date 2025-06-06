import { supabase } from '@/utils/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .limit(1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful',
      data 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to connect to Supabase',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 