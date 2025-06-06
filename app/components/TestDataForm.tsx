import { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function TestDataForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const addTestData = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      console.log('Starting to add test data...')
      
      // Add a test transaction
      const { data: transaction, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          transaction_date: new Date().toISOString(),
          amount: 1000.00,
          currency: 'USD',
          payment_method: 'credit_card',
          card_network: 'visa',
          processor: 'stripe',
          status: 'completed'
        })
        .select()
        .single()

      if (transactionError) {
        console.error('Transaction Error:', transactionError)
        throw new Error(`Transaction Error: ${transactionError.message}`)
      }

      console.log('Transaction added:', transaction)

      // Add a settlement for the transaction
      const { data: settlement, error: settlementError } = await supabase
        .from('settlements')
        .insert({
          transaction_id: transaction.id,
          settlement_date: new Date().toISOString(),
          gross_amount: 1000.00,
          net_amount: 970.00,
          currency: 'USD',
          status: 'completed'
        })
        .select()
        .single()

      if (settlementError) {
        console.error('Settlement Error:', settlementError)
        throw new Error(`Settlement Error: ${settlementError.message}`)
      }

      console.log('Settlement added:', settlement)

      // Add some deductions
      const deductions = [
        {
          settlement_id: settlement.id,
          amount: 20.00,
          type: 'processing_fee',
          description: 'Standard processing fee'
        },
        {
          settlement_id: settlement.id,
          amount: 10.00,
          type: 'interchange_fee',
          description: 'Visa interchange fee'
        }
      ]

      const { error: deductionsError } = await supabase
        .from('deductions')
        .insert(deductions)

      if (deductionsError) {
        console.error('Deductions Error:', deductionsError)
        throw new Error(`Deductions Error: ${deductionsError.message}`)
      }

      console.log('Deductions added successfully')
      setMessage('Test data added successfully!')
    } catch (error) {
      console.error('Full error:', error)
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Test Data</h2>
      <button
        onClick={addTestData}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Adding...' : 'Add Test Data'}
      </button>
      {message && (
        <p className={`mt-4 p-2 rounded ${
          message.includes('Error') 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </p>
      )}
    </div>
  )
} 