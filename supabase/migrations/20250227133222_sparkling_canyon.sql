/*
  # Fix Row Level Security Policies

  1. Security Updates
    - Reset and properly configure RLS policies for all tables
    - Ensure authenticated users can perform all necessary CRUD operations
    - Use conditional logic to prevent duplicate policy errors

  This migration fixes the issue where users cannot add/edit/delete records due to 
  violating row-level security policies.
*/

-- First, disable any existing RLS policies for the customers table to reset
ALTER TABLE IF EXISTS customers DISABLE ROW LEVEL SECURITY;

-- Then re-enable RLS
ALTER TABLE IF EXISTS customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DO $$
BEGIN
    -- Drop each policy individually with IF EXISTS to prevent errors
    DROP POLICY IF EXISTS "Users can read customers" ON customers;
    DROP POLICY IF EXISTS "Authenticated users can insert customers" ON customers;
    DROP POLICY IF EXISTS "Authenticated users can update customers" ON customers;
    DROP POLICY IF EXISTS "Authenticated users can delete customers" ON customers;
END
$$;

-- Create new policies for customers table
CREATE POLICY "Enable read access for authenticated users"
ON customers FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users"
ON customers FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
ON customers FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Enable delete access for authenticated users"
ON customers FOR DELETE
TO authenticated
USING (true);

-- Ensure campaigns table has proper RLS
ALTER TABLE IF EXISTS campaigns ENABLE ROW LEVEL SECURITY;

-- Drop existing policies for campaigns table if they exist
DO $$
BEGIN
    DROP POLICY IF EXISTS "Enable read access for authenticated users" ON campaigns;
    DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON campaigns;
    DROP POLICY IF EXISTS "Enable update access for authenticated users" ON campaigns;
    DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON campaigns;
EXCEPTION
    WHEN undefined_table THEN
        -- Handle the case where the table doesn't exist yet
END
$$;

-- Create policies for campaigns table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'campaigns') THEN
        CREATE POLICY "Enable read access for authenticated users"
        ON campaigns FOR SELECT
        TO authenticated
        USING (true);

        CREATE POLICY "Enable insert access for authenticated users"
        ON campaigns FOR INSERT
        TO authenticated
        WITH CHECK (true);

        CREATE POLICY "Enable update access for authenticated users"
        ON campaigns FOR UPDATE
        TO authenticated
        USING (true);

        CREATE POLICY "Enable delete access for authenticated users"
        ON campaigns FOR DELETE
        TO authenticated
        USING (true);
    END IF;
END
$$;

-- Ensure deals table has proper RLS
ALTER TABLE IF EXISTS deals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies for deals table if they exist
DO $$
BEGIN
    DROP POLICY IF EXISTS "Enable read access for authenticated users" ON deals;
    DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON deals;
    DROP POLICY IF EXISTS "Enable update access for authenticated users" ON deals;
    DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON deals;
EXCEPTION
    WHEN undefined_table THEN
        -- Handle the case where the table doesn't exist yet
END
$$;

-- Create policies for deals table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'deals') THEN
        CREATE POLICY "Enable read access for authenticated users"
        ON deals FOR SELECT
        TO authenticated
        USING (true);

        CREATE POLICY "Enable insert access for authenticated users"
        ON deals FOR INSERT
        TO authenticated
        WITH CHECK (true);

        CREATE POLICY "Enable update access for authenticated users"
        ON deals FOR UPDATE
        TO authenticated
        USING (true);

        CREATE POLICY "Enable delete access for authenticated users"
        ON deals FOR DELETE
        TO authenticated
        USING (true);
    END IF;
END
$$;