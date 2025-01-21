/*
  # Create customers table and sample data

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `status` (text)
      - `avatar` (text)
      - `spent` (numeric)
      - `last_order` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `customers` table
    - Add policies for authenticated users to read all customers
    - Add policies for admin users to modify customers
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'active',
  avatar text,
  spent numeric DEFAULT 0,
  last_order timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all customers" ON customers
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert customers" ON customers
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Only admins can update customers" ON customers
  FOR UPDATE USING (
    auth.jwt() ->> 'role' = 'admin'
  ) WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Insert sample data
INSERT INTO customers (name, email, status, avatar, spent, last_order) VALUES
  ('Alice Freeman', 'alice@example.com', 'active', 'https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png', 1200, '2023-12-20'),
  ('Bob Smith', 'bob@example.com', 'inactive', 'https://cdn.usegalileo.ai/stability/d4e7d763-28f3-4af2-bc57-a26db12c522b.png', 800, '2023-12-15'),
  ('Charlie Brown', 'charlie@example.com', 'active', 'https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png', 2500, '2023-12-18'),
  ('David Jones', 'david@example.com', 'active', 'https://cdn.usegalileo.ai/stability/1af7ccee-eb75-4af5-b80e-ee2ec64a79ef.png', 3200, '2023-12-19');