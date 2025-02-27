/*
  # Create deals table for sales pipeline

  1. New Tables
    - `deals`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `company` (text, required)
      - `value` (numeric)
      - `stage` (text)
      - `progress` (integer)
      - `due_date` (date)
      - `assigned_to` (jsonb)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `deals` table
    - Add policies for authenticated users to read and manage deals
*/

CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  value numeric DEFAULT 0,
  stage text DEFAULT 'qualified',
  progress integer DEFAULT 20,
  due_date date,
  assigned_to jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read deals" 
  ON deals
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert deals"
  ON deals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update deals"
  ON deals
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete deals"
  ON deals
  FOR DELETE
  TO authenticated
  USING (true);