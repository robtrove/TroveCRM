/*
  # Customers table schema

  1. Table Structure
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required, unique)
      - `status` (text)
      - `avatar` (text)
      - `company` (text)
      - `company_size` (text)
      - `industry` (text)
      - `website` (text)
      - `timezone` (text)
      - `tags` (text[])
      - `notes` (text)
      - `spent` (numeric)
      - `last_order` (date)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS if not already enabled
    - Policies are handled conditionally to avoid conflicts
*/

-- Create the customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  status text DEFAULT 'active',
  avatar text,
  company text,
  company_size text,
  industry text,
  website text,
  timezone text DEFAULT 'UTC',
  tags text[],
  notes text,
  spent numeric DEFAULT 0,
  last_order date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (if not already enabled)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create missing policies if they don't exist
DO $$
BEGIN
  -- Check if "Authenticated users can insert customers" policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'customers' 
    AND policyname = 'Authenticated users can insert customers'
  ) THEN
    CREATE POLICY "Authenticated users can insert customers"
      ON customers
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  -- Check if "Authenticated users can update customers" policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'customers' 
    AND policyname = 'Authenticated users can update customers'
  ) THEN
    CREATE POLICY "Authenticated users can update customers"
      ON customers
      FOR UPDATE
      TO authenticated
      USING (true);
  END IF;

  -- Check if "Authenticated users can delete customers" policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'customers' 
    AND policyname = 'Authenticated users can delete customers'
  ) THEN
    CREATE POLICY "Authenticated users can delete customers"
      ON customers
      FOR DELETE
      TO authenticated
      USING (true);
  END IF;
END $$;