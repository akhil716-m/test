-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON transactions;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON settlements;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON deductions;

-- Create new policies for transactions
CREATE POLICY "Enable all access for authenticated users" ON transactions
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create new policies for settlements
CREATE POLICY "Enable all access for authenticated users" ON settlements
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create new policies for deductions
CREATE POLICY "Enable all access for authenticated users" ON deductions
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true); 