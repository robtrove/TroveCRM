/*
  # Create customers table

  1. New Tables
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
    - Enable RLS on `customers` table
    - Add policies for authenticated users to read and manage their data
*/

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

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read customers" 
  ON customers
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete customers"
  ON customers
  FOR DELETE
  TO authenticated
  USING (true);